const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig')

afterAll(() => {
  db.destroy()
})

describe('/api/auth/registration', () => {

  it('should return a 201 status code ', async () => {
    const expectedStatusCode = 201
    const response = await request(server)
        .post('/api/auth/register')
        .send({ username: 'Peter', password: '1234567' })

    expect(response.status).toEqual(expectedStatusCode)
  })

  it('should return respond with a json object', async () => {
    const response = await request(server).post('/api/auth/register').send(
        { username: 'Sean', password: '1234567' })

    expect(response.type).toBe('application/json')
  })
})

describe('Get /api/jokes', () => {

  it('should have an authorization header', async () => {
    const response = await request(server).get('/api/jokes')

    expect(response).toHaveProperty('header')
  })

  it('should responed with a 401 status code when no auth is provided', async () => {
    const response = await request(server).get('/api/jokes')

    expect(response.status).toBe(401)
  })
})

describe('POST /api/auth/login', () => {

  it('should return a status code of 200', async () => {
    const response = await request(server).post('/api/auth/login').send(
        { username: 'Sean', password: '1234567' })

    expect(response.status).toBe(200)
  })

  it('should return a token in the response', async () => {
    const response = await request(server).post('/api/auth/login').send(
        { username: 'Sean', password: '1234567' })

    expect(response.body).toHaveProperty('token')

  })
})
