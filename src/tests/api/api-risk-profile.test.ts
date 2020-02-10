import request from 'supertest'
import app from '../../config/server'

const ENDPOINT = '/risk/profile'

describe(`[POST] ${ENDPOINT} - should return the correct profile`, () => {
  test('Should return the model of output', (done) => {
    const input = {
      age: 35,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    }

    const output = {
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular'
    } as const

    request(app)
      .post(ENDPOINT)
      .send(input)
      .expect(200)
      .end((_err, response) => {
        expect(response.body).toStrictEqual(output)
        done()
      })
  })
})
