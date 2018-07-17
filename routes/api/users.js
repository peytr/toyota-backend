// Require Node Packages
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

// Models
const User = require('../../models/User')

// Validations
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Constants
const SECRET = process.env.secret
const router = express.Router()

// GET api/users - Returns all users from the User Collection
router.get('/', async (req, res) => {
  const users = await User.listAll()
  return res.status(200).json(users)
})

// GET api/users/me - Retrieves id from JWT payload and returns information about the current user
router.get('/me', async (req, res) => {
  const me = await User.findById()
  return res.status(200).json(me)
})

// POST api/user/register receives json with user details including:
// firstName, lastName, employeeNumber, email, department, password, administrator, active
// TODO: add authorisation for admin only (only admin should reach this route)
// TODO: Consider bringing validations for uniqueness down to the model
router.post('/register', async (req, res) => {
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
  res.json(user)
})

// POST api/user/login receives json with fields:
// employeeNumber, password
// if valid returns JWT token upon login
// if not valid returns 400 with error
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const employeeNumber = req.body.employeeNumber
  const password = req.body.password
  const user = await User.findOne({employeeNumber: employeeNumber})
  if (!user) {
    return res.status(400).json(errors)
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    const payload = {
      id: user.id,
      employeeNumber: user.employeeNumber,
      administrator: user.administrator
    }
    jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {

      }
      return res.json({
        success: true,
        token: 'Bearer ' + token
      })
    })
  } else {
    errors.password = 'Incorrect Employee Number or Password'
    return res.status(400).json(errors)
  }
})

// TODO: Extract user id from JWT and hit database for user information to send back
// GET api/users/current return user profile information based on current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    employeeNumber: req.body.employeeNumber,
    administrator: req.body.administrator
  })
})

module.exports = router
