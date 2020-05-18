/*
 complete the middleware code to check if the user is logged in
 before granting access to the next middleware/route handler
 */

const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = async ( req, res, next ) => {
  const token = req.headers.authorization
  try {
    if (!token) {
      res.status(401).json({ you: 'shall not pass!' })
    }
    jwt.verify(token, secrets.jwtSecret, ( err, decoded ) => {
      if (err) {
        return res.status(401).json({ you: 'shall not pass' })
      }
      req.token = decoded
      next()
    })
  } catch (err) {
    next()
  }
}
