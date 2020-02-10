import request from 'supertest'
import app from '../../config/server'

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
  test(`[POST] ${ENDPOINT} - Should return an error`, (done) => {
    request(app)
      .post(ENDPOINT)
      .send({})
      .expect(400)
      .end(() => done())
  })

  test(`[POST] ${ENDPOINT} - Should return an error with risk_questions`, (done) => {
    request(app)
      .post(ENDPOINT)
      .send({ ...input, risk_questions: ['1', 'false', 'true'] })
      .expect(400)
      .end(() => done())
  })

  test(`[POST] ${ENDPOINT} - Should return an error with marital_status`, (done) => {
    return request(app)
      .post(ENDPOINT)
      .send({ ...input, marital_status: 'divorced' })
      .expect(400)
      .end(() => done())
  })

  test(`[POST] ${ENDPOINT} - Should return an error with house ownership_status`, (done) => {
    return request(app)
      .post(ENDPOINT)
      .send({ ...input, house: { ownership_status: 'unknown' } })
      .expect(400)
      .end(() => done())
  })

  test(`[POST] ${ENDPOINT} - Should return an error with income`, (done) => {
    return request(app)
      .post(ENDPOINT)
      .send({ ...input, income: -50 })
      .expect(400)
      .end(() => done())
  })

  test(`[POST] ${ENDPOINT} - Should return an error with house`, (done) => {
    return request(app)
      .post(ENDPOINT)
      .send({ ...input, house: {} })
      .expect(400)
      .end(() => done())
  })

  test(`[POST] ${ENDPOINT} - Should return an error with vehicle`, (done) => {
    return request(app)
      .post(ENDPOINT)
      .send({ ...input, vehicle: {} })
      .expect(400)
      .end(() => done())
  })
})
