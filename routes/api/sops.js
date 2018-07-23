// Require Node Packages
const express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
var aws = require('aws-sdk')

require('dotenv').config()

// Models
const Sop = require('../../models/Sop')
const User = require('../../models/User')

// Custom Midleware
const userAuth = require('../../middleware/userAuth')
const adminAuth = require('../../middleware/adminAuth')

// constants
const AWS_KEY = process.env.AWS_KEY
const AWS_ID = process.env.AWS_ID
const AWS_BUCKET = process.env.AWS_BUCKET

// S3 / Multer configuration
aws.config.update({
  secretAccessKey: AWS_KEY,
  accessKeyId: AWS_ID
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
    contentDisposition: 'inline',
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body))
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

const router = express.Router()

// GET api/sops - Returns all sops
router.get('/', userAuth, async (req, res) => {
  try {
    const sops = await Sop.find({})
    return res.status(200).json(sops)
  } catch (err) {
    return res.status(500).json({errors: {'sops': 'Unable to find sops'}})
  }
})

// POST api/sops - Creates an Sop
router.post('/', [userAuth, adminAuth, upload.any()], async (req, res) => {
  try {
    const { title, department } = req.body
    const currentVersion = {
      version: req.body.version,
      author: req.body.author,
      createdAt: req.body.createdAt,
      awsPath: req.files[0].key
    }
    const sop = new Sop({
      title,
      department,
      currentVersion
    })
    await sop.save()
    return res.status(200).json(sop)
  } catch (err) {
    return res.status(500).json({errors: {'sops': `Unable to create SOP due to ${err.message}`}})
  }
})

// GET api/sops/mysop - Returns SOPs of current logged in user
router.get('/mysop', userAuth, async (req, res) => {
  const readSops = await Sop.find({ 'currentVersion.usersRead': req.user._id }).select('title currentVersion.version currentVersion.awsPath')
  const unreadSops = await Sop.find({
    'currentVersion.usersRequired': req.user._id,
    'currentVersion.usersRead': { $ne: req.user._id },
    'previousVersions.usersRead': { $ne: req.user._id }}).select('title currentVersion.version currentVersion.awsPath')
  const outdatedSops = await Sop.find({
    'currentVersion.usersRequired': req.user._id,
    'currentVersion.usersRead': { $ne: req.user._id },
    'previousVersions.usersRead': req.user._id }).select('title currentVersion.version currentVersion.awsPath')
  const summarySop = {
    readSops,
    unreadSops,
    outdatedSops
  }
  return res.status(200).json(summarySop)
})

// GET api/sops/markasread/:id - Current logged in user marks sop :id as read
router.patch('/markasread/:id', userAuth, async (req, res) => {
  await Sop.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { 'currentVersion.usersRead': req.user._id, 'currentVersion.usersRequired': req.user._id } },
    { new: true }
  )
  return res.status(200).json({success: true})
})

// PATCH /addusers/:id Finds SOP with _Id, recieves an array of users required to read it
router.patch('/addusers/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    await Sop.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { 'currentVersion.usersRequired': { $each: req.body.userIds } } },
      { new: true }
    )
    return res.status(200).json({success: true, message: 'yay'})
  } catch (err) {
    return res.status(500)({errors: {'sops': `Unable to add users to read SOP due to ${err.message}`}})
  }
})

// PATCH /removeuser/:id Finds SOP with _id, recieves a user with _id no longer required to read it
router.patch('/removeuser/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const sop = await Sop.findOne({ _id: req.params.id, 'currentVersion.usersRead': req.body.userId })
    if (sop) { return res.status(400).json({'errors': {'sops': 'user has already read SOPS'}}) }
    await Sop.findByIdAndUpdate(
      req.params.id,
      { $pull: { 'currentVersion.usersRequired': req.body.userId } },
      { new: true }
    )
    return res.status(200).json({success: true, message: 'yay'})
  } catch (err) {
    return res.status(500).json({errors: {'sops': `Unable to add users to read SOP due to ${err.message}`}})
  }
})

// PATCH /addversion/:id
router.post('/addversion/:id', [userAuth, adminAuth, upload.any()], async (req, res) => {
  try {
    const newVersion = {
      author: req.body.author,
      createdAt: req.body.createdAt,
      awsPath: req.files[0].key
    }
    const sop = await Sop.findById(req.params.id)
    sop.previousVersions.push(sop.currentVersion)
    newVersion.version = sop.currentVersion.version + 1
    sop.currentVersion = Object.assign(newVersion, { usersRequired: sop.currentVersion.usersRequired })
    await sop.save()
  } catch (err) {
    console.log(err.message)
    return res.status(500)({errors: {'sops': `Unable to add update SOP due to ${err.message}`}})
  }
})

// GET /download/:key Streams PDF file from AWS bucket corresponding to :key
router.get('/download/:key', function (req, res, next) {
  const params = {
    Bucket: AWS_BUCKET,
    Key: req.params.key
  }
  s3.headObject(params, function (err, data) {
    if (err) {
      return next(err)
    }
    var stream = s3.getObject(params).createReadStream()
    stream.on('error', (err) => {
      return next(err)
    })
    res.set('Content-Type', data.ContentType)
    res.set('Content-Length', data.ContentLength)
    res.set('Last-Modified', data.LastModified)
    res.set('ETag', data.ETag)
    stream.pipe(res)
  })
})

// GET /sops/:id GETS information about SOP with _id
router.get('/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const sop1 = await Sop.findById(req.params.id).populate({path: 'currentVersion.usersRead', model: 'users'})
    const sop = sop1.toObject({ virtuals: true })
    const readIds = new Set(sop.currentVersion.usersRead.map(x => x._id.toString()))
    const requiredIds = new Set(sop.currentVersion.usersRequired.map(x => x.toString()))
    const unreadIds = new Set([...requiredIds].filter(x => !readIds.has(x)))
    const unreadUserIds = Array.from(unreadIds)
    const usersUnread = await User.find({_id: { $in: unreadUserIds }}).select('firstName lastName fullName department')
    const usersSelectable = await User.find({_id: {$nin: sop.currentVersion.usersRequired}}).select('firstName lastName fullName department')
    const pieData = sop.currentVersion.pieData
    const summaryStats = sop.currentVersion.summaryStats
    return res.status(200).json({sop, usersUnread, usersSelectable, pieData, summaryStats})
  } catch (err) {
    return res.status(500).json({errors: {'sop': 'Unable to find sop'}})
  }
})

module.exports = router
