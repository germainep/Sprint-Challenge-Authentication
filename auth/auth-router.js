const router = require('express').Router()
const Users = require('./authModels')
const secrets = require('../config/secrets')

const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async ( req, res, next ) => {
  const { password } = req.body
  // implement registration

  const hash = bcrypt.hashSync(password, 8)
  req.body.password = hash

  const newUser = await Users.add(req.body)
  try {
    res.status(201).json({ newUser, message: 'new user created' })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async ( req, res, next ) => {
  // implement login
  const { username, password } = req.body

  const user = await Users.findUserByUsername(username)
  try {
    if (!user && !bcrypt.compareSync(user.password, password)) {
      res.status(401).json('Invalid Credentials')
    }
    const token = tokenGenerator(user)
    res.json({ user, token })
  } catch (err) {
    next(err)
  }

})

function tokenGenerator ( user ) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1hr'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router
