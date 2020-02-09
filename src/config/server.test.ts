/* eslint-disable no-undef */
import app from './server'
import request from 'supertest'

describe('server', () => {
  test('Server should be started', async (done) => {
    await request(app).get('/').expect(200)
    done()
  })
})
