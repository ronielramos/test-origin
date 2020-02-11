import app from '../../config/server'
import request from 'supertest'

describe('server', () => {
  test('[GET] /healthcheck - Server should be started', (done) =>
    request(app).get('/healthcheck')
      .end((_err, response) => {
        expect(response.status).toBe(200)
        done()
      })
  )
})
