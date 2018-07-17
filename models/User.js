const mongoose = require('mongoose')
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
    required: true
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

const User = mongoose.model('users', userSchema)

module.exports = User
