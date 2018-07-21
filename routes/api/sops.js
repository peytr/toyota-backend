// Require Node Packages
const express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
var aws = require('aws-sdk')
require('dotenv').config()

// Models
const Sop = require('../../models/Sop')

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

router.get('/mysop', userAuth, async (req, res) => {
  const readSops = await Sop.find({ 'currentVersion.usersRead': req.user._id })
  const unreadSops = await Sop.find({
    'currentVersion.usersRequired': req.user._id,
    'currentVersion.usersRead': { $ne: req.user._id },
    'oldVersions.usersRead': { $ne: req.user._id }})
  const outdatedSops = await Sop.find({
    'currentVersion.usersRequired': req.user._id,
    'currentVersion.usersRead': { $ne: req.user._id },
    'oldVersions.usersRead': req.user._id })
  const summarySop = {
    readSops,
    unreadSops,
    outdatedSops
  }
  return res.status(200).json(summarySop)
})

router.patch('/markasread/:id', userAuth, async (req, res) => {
  const sop = await Sop.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { 'currentVersion.usersRead': req.user._id, 'currentVersion.usersRequired': req.user._id } },
    { new: true }
  )
  return sop
})

router.patch('/adduser/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const sop = await Sop.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { 'currentVersion.usersRequired': req.body.userId } },
      { new: true }
    )
    return res.status(200).json(sop)
  } catch (err) {
    return res.status(500)({errors: {'sops': `Unable to add user to read SOP due to ${err.message}`}})
  }
})

router.patch('addusers/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const sop = await Sop.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { 'currentVersion.usersRequired': { $each: req.body.usersIds } } },
      { new: true }
    )
    return res.status(200).json(sop)
  } catch (err) {
    return res.status(500)({errors: {'sops': `Unable to add users to read SOP due to ${err.message}`}})
  }
})

router.patch('/addversion/:id', [userAuth, adminAuth], async (req, res) => {
  const ver = req.body.ver
  try {
    const sop = await Sop.findById(req.params.id)
    sop.oldVersions.push(sop.currentVersion)
    sop.currentVersion = Object.assign(ver, { usersRequired: sop.currentVersion.usersRequired })
    await sop.save()
  } catch (err) {
    return res.status(500)({errors: {'sops': `Unable to add update SOP due to ${err.message}`}})
  }
})

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
    console.log(data)
    res.set('Content-Type', data.ContentType)
    res.set('Content-Length', data.ContentLength)
    res.set('Last-Modified', data.LastModified)
    res.set('ETag', data.ETag)
    stream.pipe(res)
  })
})

router.get('/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const sop = await Sop.findById(req.params.id)
    return res.status(200).json(sop)
  } catch (err) {
    return res.status(500).json({errors: {'sop': 'Unable to find sop'}})
  }
})

module.exports = router