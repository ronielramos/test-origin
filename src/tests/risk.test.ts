/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/camelcase */
import request from 'supertest'
import app from '../config/server'

const input = {
  age: 35,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 0,
  marital_status: 'married',
  risk_questions: [0, 1, 0],
  vehicle: { year: 2018 }
} as const

const output = {
  auto: 'regular',
  disability: 'ineligible',
  home: 'economic',
  life: 'regular'
} as const

describe('Validation test', () => {
  test('Should return the model of output', (done) => {
    request(app)
      .post('/')
      .send(input)
      .end((err, response) => {
        expect(err).toBeFalsy()
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual(output)
        done()
      })
  })

  test('Should return an error', (done) => {
    request(app)
      .post('/')
      .send({})
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })

  test('Should return an error with risk_questions', (done) => {
    request(app)
      .post('/')
      .send({ ...input, risk_questions: ['1', 'false', 'true'] })
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })

  test('Should return an error with marital_status', (done) => {
    request(app)
      .post('/')
      .send({ ...input, marital_status: 'divorced' })
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })

  test('Should return an error with house ownership_status', (done) => {
    request(app)
      .post('/')
      .send({ ...input, house: { ownership_status: 'unknown' } })
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })

  test('Should return an error with income', (done) => {
    request(app)
      .post('/')
      .send({ ...input, income: -50 })
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })

  test('Should return an error with house', (done) => {
    request(app)
      .post('/')
      .send({ ...input, house: {} })
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })

  test('Should return an error with vehicle', (done) => {
    request(app)
      .post('/')
      .send({ ...input, vehicle: {} })
      .end((err, response) => {
        expect(err).toBeNull()
        expect(response.status).toBe(400)
        done()
      })
  })
})
