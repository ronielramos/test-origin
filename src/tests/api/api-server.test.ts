/* eslint-disable no-undef */
import app from '../../config/server'
import request from 'supertest'

describe('server', () => {
  test('[GET] / - Server should be started', async (done) => {
    await request(app).get('/').expect(200)
    done()
  })
})
