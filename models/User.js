const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SECRET = process.env.SECRET

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  employeeNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  administrator: {
    type: Boolean,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(12, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      return next()
    })
  })
})

userSchema.statics.listAll = function () {
  return this.find().select('-password')
}

userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    administrator: this.administrator
  }
  return jwt.sign(payload, SECRET, { expiresIn: 3600 })
}

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

userSchema.set('toObject', { getters: true })

const User = mongoose.model('users', userSchema)

module.exports = User
