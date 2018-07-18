module.exports = function adminAuth (req, res, next) {
  if (!req.user.administrator) {
    return res.status(403).send({errors: {'Authorization': 'Access denied'}})
  }
  next()
}
