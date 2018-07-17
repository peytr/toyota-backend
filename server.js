// Require node packages
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

// Passport Config
require('./passport.js')(passport)

// Routes
const users = require('./routes/api/users')

// Constants
const PORT = process.env.PORT || 5000
const mongoURI = process.env.mongoURI

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(helmet())
app.use(cors())

// Database Connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })

app.use('/api/users', users)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
