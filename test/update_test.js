const assert = require('assert')
const User = require('../models/User')

describe('Updating records', () => {
  let bob

  beforeEach((done) => {
    bob = new User({ 
      firstName: 'Bob',
      lastName: 'Cat',
      employeeNumber: 'T55555',
      email: 'mail5@mail.com',
      department: 'Evalutation',
      password: 'password123',
      administrator: true,
      active: true
  })
    bob.save()
      .then(() => done())
  })

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].firstName === 'Bob');
      done()
    })
  }

  it('instance set save', (done) => {
   bob.set('name', 'Robert')
   assertName(bob.save(), done)

  })

  it('A model instance can update', (done) => {
    assertName(bob.update({ name: 'Robert' }), done)
  })

  it('A model class can update', (done) => {
    assertName(User.update({ name: 'Bob' }, { name: 'Robert'}), done)
  })

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Bob'}, { name: 'Robert'}), done)
  })

  it('A model class can find a record with an Id and update it', (done) => {
    assertName(User.findByIdAndUpdate(bob._id, { name: 'Robert'}), done)
  })

})