const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput (data) {
  let errors = {}

  data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
  data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.employeeNumber = !isEmpty(data.employeeNumber) ? data.employeeNumber : ''
  data.department = !isEmpty(data.department) ? data.department : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''
  data.administrator = !isEmpty(data.administrator) ? data.administrator : false
  data.active = !isEmpty(data.active) ? data.active : true

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First name must be between 2 and 30 characters'
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required'
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required'
  }

  if (Validator.isEmpty(data.employeeNumber)) {
    errors.employeeNumber = 'Employee number is required'
  }

  if (!Validator.isLength(data.employeeNumber, { min: 6, max: 6 })) {
    errors.password = 'Please enter a valid employee number'
  }

  if (Validator.isEmpty(data.department)) {
    errors.employeeNumber = 'Please select a department'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
