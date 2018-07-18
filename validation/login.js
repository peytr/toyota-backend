const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput (data) {
  let errors = {}

  data.employeeNumber = !isEmpty(data.employeeNumber) ? data.employeeNumber : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.employeeNumber)) {
    errors.employeeNumber = 'Employee number is required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
