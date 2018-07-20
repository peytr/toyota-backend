// Require node packages
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Require in Routes
const users = require('./routes/api/users')

const error = require('./middleware/error')
// Constants
const PORT = process.env.PORT || 5000
const mongoURI = process.env.mongoURI
const FRONTENDURL = process.env.FRONTENDURL
const SECRET = process.env.SECRET

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(cors({
  origin: FRONTENDURL,
  credentials: true
}))

// Database Connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })

app.use('/api/users', users)

app.get('/api/auth', (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(200).json({login: false, administrator: false})
  }
  try {
    const decoded = jwt.verify(token, SECRET)
    return res.status(200).json({login: true, administrator: decoded.administrator})
  } catch (err) {
    return res.status(200).json({login: false, administrator: false})
  }
})

app.use(error)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
