// Require node packages
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

require('dotenv').config()

// Models
const User = require('./models/User')

// Constants
const SECRET = process.env.secret

// Creating and empty options object
const options = {}
// You are using Exctract.Jwt method to extract the token from the header and set it as a key, the key is called jwtFromRequest
// secretOrKey is the secret value from our .env
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = SECRET

// We are exporting a function which takes in a parameter passport.
// Uses function JwtStrategy will decode the token.
module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if(user){
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}