const db = require('../database/dbConfig')

async function add ( userData ) {
  const [ newUser ] = await db('users').insert(userData)

  const user = findUserById(newUser)

  return user
}

async function findUserById ( id ) {
  const user = await db('users').where('id', id)

  return user
}

function findUserByUsername ( username ) {
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
