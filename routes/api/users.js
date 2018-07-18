// Require Node Packages
const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config()

// Models
const User = require('../../models/User')

// Validations
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const userAuth = require('../../middleware/userAuth')
const adminAuth = require('../../middleware/adminAuth')

// Constants
const router = express.Router()

// GET api/users - Returns all users from the User Collection
router.get('/', [userAuth, adminAuth], async (req, res) => {
  try {
    const users = await User.listAll()
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json({errors: 'Unable to find users'})
  }
})

// GET api/users/current - Retrieves id from JWT payload and returns information about the current user
router.get('/current', userAuth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  return res.status(200).json(user)
})

// POST api/user/register receives json with user details
// TODO: Consider bringing validations for uniqueness down to the model
router.post('/register', [userAuth, adminAuth], async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const existingUser = await User.findOne({ email: req.body.email })
  if (existingUser) {
    errors.email = 'A user with that email already exists'
    return res.status(400).json(errors)
  }
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    employeeNumber: req.body.employeeNumber,
    email: req.body.email,
    department: req.body.department,
    password: req.body.password,
    administrator: req.body.administrator,
    active: req.body.active
  })
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(newUser.password, salt)
  newUser.password = hash
  const user = await newUser.save()
  return res.status(200).json(user)
})

// POST api/users/login receives json with fields: employeeNumber, password
// if valid returns JWT token upon login
// if not valid returns 400 with error
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { password, employeeNumber } = req.body
  const user = await User.findOne({employeeNumber: employeeNumber})
  if (!user) {
    return res.status(400).json(errors)
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    errors.password = 'Incorrect Employee Number or Password'
    return res.status(400).json(errors)
  }
  const token = user.generateAuthToken()
  return res.cookie('access_token', token, {}).json({success: true})
})

// GET api/users/:id
router.get('/:id', [userAuth, adminAuth], async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  return res.status(200).json(user)
})

//  PATCH / PUT  /api/users/:id
router.patch('/:id', [userAuth, adminAuth], async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(400).json({errors: 'User Not Found'})
  }
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  user.set({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    employeeNumber: req.body.employeeNumber,
    email: req.body.email,
    department: req.body.department,
    password: req.body.password,
    administrator: req.body.administrator,
    active: req.body.active
  })
  await user.save()
  return res.status(200).json(user)
})

module.exports = router
