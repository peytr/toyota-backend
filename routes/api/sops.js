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

// S3 / Multer configuration
const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'multer-test',
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
  const options = {
    Bucket: 'multer-test',
    Key: req.params.key
  }
  var fileStream = s3.getObject(options).createReadStream()
  fileStream.pipe(res)
})

module.exports = router
