import request from 'supertest'
import app from '../../config/server'
import router from '../../risk-profile/risk-profile.controller'

const ENDPOINT = '/risk/profile'

const input = {
  age: 35,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 0,
  marital_status: 'married',
  risk_questions: [0, 1, 0],
  vehicle: { year: 2018 }
}

describe('Payload validation', () => {
  beforeAll(() => app.use(router))

  test(`[POST] ${ENDPOINT} - Should return an error`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({})
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )

  test(`[POST] ${ENDPOINT} - Should return an error with risk_questions`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({ ...input, risk_questions: ['1', 'false', 'true'] })
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )

  test(`[POST] ${ENDPOINT} - Should return an error with marital_status`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({ ...input, marital_status: 'divorced' })
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )

  test(`[POST] ${ENDPOINT} - Should return an error with house ownership_status`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({ ...input, house: { ownership_status: 'unknown' } })
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )

  test(`[POST] ${ENDPOINT} - Should return an error with income`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({ ...input, income: -50 })
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )

  test(`[POST] ${ENDPOINT} - Should return an error with house`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({ ...input, house: {} })
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )

  test(`[POST] ${ENDPOINT} - Should return an error with vehicle`, (done) =>
    request(app)
      .post(ENDPOINT)
      .send({ ...input, vehicle: {} })
      .end((_err, response) => {
        expect(response.status).toBe(400)
        done()
      })
  )
})
