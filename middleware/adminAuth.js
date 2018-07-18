module.exports = function adminAuth (req, res, next) {
  console.log(req.user)
  if (!req.user.administrator) {
    return res.status(403).send({errors: 'Access denied'})
  }
  next()
}
