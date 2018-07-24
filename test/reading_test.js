const assert = require('assert');
const User = require('../models/User')

describe('Reading users out of the database', function () {

  let nat, luke, jay, pete;

  beforeEach((done) => {
    nat = new User({ 
      firstName: 'Nat',
      lastName: 'Tan',
      employeeNumber: 'T11111',
      email: 'mail1@mail.com',
      department: 'Evaluation',
      password: 'password123',
      administrator: true,
      active: true
    })

    luke = new User({
      firstName: 'Luke',
      lastName: 'Colcott',
      employeeNumber: 'T22222',
      email: 'mail2@mail.com',
      department: 'Evaluation',
      password: 'password123',
      administrator: true,
      active: true
    })

    jay = new User({ 
      firstName: 'Jay',
      lastName: 'Baseluse',
      employeeNumber: 'T33333',
      email: 'mail3@mail.com',
      department: 'Evaluation',
      password: 'password123',
      administrator: true,
      active: true
    })

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

    Promise.all([nat.save(), luke.save(), jay.save(), pete.save()])
      .then(() => done())
  })

  it('finds all users with a name of nat', (done) => {
    User.find({ 
      firstName: 'Nat' })
      .then((users) => {
        assert(users[0]._id.toString() === nat._id.toString());
        done()
      })
  })

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: luke._id })
      .then((user) => {
        assert(user.firstName === 'Luke');
        done();
      });
  });
});