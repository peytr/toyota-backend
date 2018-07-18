const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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

const User = mongoose.model('users', userSchema)

module.exports = User
