const db = require('../database/dbConfig')

const add = (userData) => {
  const [ newUser ] = db('users').insert(userData)
  const user = findUserById(newUser)

  return user
}

const findUserById = (id) => {
  const user = db('users').where('id', id)

  return user
}

const findUserByUsername = (username) => {
  const user = db('users')
    .where('username', username)
    .first()
    .select('id', 'username')

  return user
}

module.exports = {
  add: add,
  findUserByUsername: findUserByUsername,
}
