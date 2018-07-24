const assert = require('assert'); 
const User = require('../models/User')

describe('Deleting a user', () => {
  let pete;

  beforeEach((done) => {
    pete = new User({ 
      firstName: 'Pete',
      lastName: 'Cavalot',
      employeeNumber: 'T12345',
      email: 'mail@mail.com',
      department: 'Evalutation',
      password: 'password123',
      administrator: true,
      active: true
    })
    pete.save()
      .then(() => done())
  })

  it('model instance remove', (done) => {
    pete.remove()
      .then(() => User.findOne({ name: 'Pete' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method remove', (done) => {
    User.remove({ name: 'Pete' })
      .then(() => User.findOne({ name: 'Pete' }))
        .then((user) => {
          assert(user === null)
          done()
        })
  })

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Pete' })
      .then(() => User.findOne({ name: 'Pete' }))
        .then((user) => {
          assert(user === null);
          done()
        })
  })

  it('class method findIdAndRemove', (done) => {
    User.findByIdAndRemove( pete._id )
      .then(() => User.findOne({ name: 'Pete' }))
        .then((user) => {
          assert(user === null);
          done()
        })
  })
})