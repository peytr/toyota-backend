const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = function userAuth (req, res, next) {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json({errors: {'Unauthorized': 'Access denied'}})
  }

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({errors: {'Bad Request': 'Invalid token'}})
  }
}
