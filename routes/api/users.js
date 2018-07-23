// Require Node Packages
const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config()

// Models
const User = require('../../models/User')

// Validations
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const validateUpdateUserInput = require('../../validation/updateUser')
const updateOldPassword = require('../../validation/updateOldPassword')
const updateUserPassword = require('../../validation/updateUserPassword')

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
    return res.status(500).json({errors: {'user': 'Unable to find users'}})
  }
})

// GET api/users/me - Retrieves id from JWT payload and returns information about the current user
router.get('/me', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({errors: {'user': 'Unable to find user'}})
  }
})

//  PATCH /api/users/:id
router.patch('/password', [userAuth, adminAuth], async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({errors: {'user': 'Unable to find user'}})
    }
    const { errors, isValid } = updateOldPassword(req.body)
    if (!isValid) {
      return res.status(400).json({errors})
    }
    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
    if (!validPassword) {
      errors.password = 'Incorrect Employee Number or Password'
      return res.status(400).json({errors: 'Invalid Employee Number or Password'})
    }
    user.set({password: req.body.password})
    await user.save()
    return res.status(200).json({success: true})
  } catch (err) {
    return res.status(500).json({errors: {'user': 'Unable to find update user password'}})
  }
})

router.get('/logout', (req, res) => {
  return res.clearCookie('access_token').send()
})

// POST api/user/register receives json with user details
router.post('/register', [userAuth, adminAuth], async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  try {
    const existingEmail = await User.findOne({ email: req.body.email })
    const existingEmployee = await User.findOne({ employeeNumber: req.body.employeeNumber })
    if (existingEmail || existingEmployee || !isValid) {
      if (existingEmail) { errors.email = 'A user with that email already exists' }
      if (existingEmployee) { errors.employeeNumber = 'A user with that employee number already exists' }
      return res.status(400).json({errors})
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
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({errors: `Unable to create new user due to ${err.message}`})
  }
})

// POST api/users/login receives json and sets cookie if credentials are correct
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { password, employeeNumber } = req.body
  const user = await User.findOne({employeeNumber: employeeNumber})
  if (!user) {
    return res.status(200).json({errors: 'Invalid Employee Number or Password'})
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    errors.password = 'Incorrect Employee Number or Password'
    return res.status(400).json({errors: 'Invalid Employee Number or Password'})
  }
  const token = user.generateAuthToken()
  res.cookie('access_token', token, {})
  return res.json({success: true, administrator: user.administrator})
})

// GET api/users/:id
router.get('/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({errors: {'user': 'Unable to find user'}})
  }
})

//  PATCH / PUT  /api/users/:id
router.patch('/:id', [userAuth, adminAuth], async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({errors: {'user': 'Unable to find user'}})
    }
    const { errors, isValid } = validateUpdateUserInput(req.body)
    if (!isValid) {
      return res.status(200).json({errors})
    }
    user.set({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      employeeNumber: req.body.employeeNumber,
      email: req.body.email,
      department: req.body.department,
      administrator: req.body.administrator,
      active: req.body.active
    })
    await user.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({errors: {'error': err.message}})
  }
})

//  PATCH / PUT  /api/users/:id
router.patch('/:id/password', [userAuth, adminAuth], async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({errors: {'user': 'Unable to find user'}})
    }
    const { errors, isValid } = updateUserPassword(req.body)
    if (!isValid) {
      return res.status(400).json({errors})
    }
    user.set({
      password: req.body.password
    })
    await user.save()
    return res.status(200).json({success: true})
  } catch (err) {
    return res.status(500).json({errors: {'error': err.message}})
  }
})

module.exports = router
