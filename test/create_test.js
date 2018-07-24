const assert = require('assert')
const User = require('../models/User')

describe('Creating records', () => {
  it('saves a user', (done) => {
    let john = new User({ 
      firstName: 'John',
      lastName: 'Doe',
      employeeNumber: 'T99999',
      email: 'mail9@mail.com',
      department: 'Evaluation',
      password: 'password123',
      administrator: true,
      active: true
    })
    john.save()
      .then(() => {
        // Test if user has been saved successfully?
        assert(!john.isNew)
        done()
      })
  })
})