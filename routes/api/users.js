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

// GET api/user/test returns Users Works! 
router.get('/test', (req,res) => {
  res.json({msg: 'Users Works!!!!!'})
})

// POST api/user/register receives json with user details including:
// firstName, lastName, employeeNumber, email, department, password, administrator, active
// TODO: add authorisation for admin only (only admin should reach this route)
router.post('/register', (req,res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if(!isValid) {
    return res.status(400).json(errors)
  }
// TODO: Refactor to async await 
// TODO: Consider bringing validations for uniqueness down to the model
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'A user with that email already exists'
        return res.status(400).json(errors)
      }
      else {
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
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
      }
    })
})

// POST api/user/login receives json with fields:
// employeeNumber, password
// if valid returns JWT token upon login
// if not valid returns 400 with error
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body)
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const employeeNumber = req.body.employeeNumber
  const password = req.body.password 

  User.findOne({employeeNumber: employeeNumber})
    .then(user => {
      // check for user
      if(!user) {
        return res.status(400).json(errors)
      }
      // check password
      // password is un-hashed, user.password is hashed
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched
            const payload = { 
              id: user.id,
              employeeNumber: user.employeeNumber,
              administrator: user.administrator
            }

            //Sign token
            jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
              return res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
          }
          else {
            errors.password = 'Incorrect Employee Number or Password'
            return res.status(400).json(errors)
          }
        })
    })
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