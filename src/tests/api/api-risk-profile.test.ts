import request from 'supertest'
import app from '../../config/server'
import router from '../../risk-profile/risk-profile.controller'
import { InsuranceRange, MaritalStatus, OwnershipStatus } from '../../risk-profile/@types/risk-profile.enum'

const ENDPOINT = '/risk/profile'

describe(`[POST] ${ENDPOINT} - should return the correct profile`, () => {
  beforeAll(() => app.use(router))

  test('Should return the model of output', (done) => {
    const input = {
      age: 35,
      dependents: 2,
      house: { ownership_status: OwnershipStatus.owned },
      income: 0,
      marital_status: MaritalStatus.married,
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    }

    const output = {
      auto: InsuranceRange.regular,
      disability: InsuranceRange.ineligible,
      home: InsuranceRange.economic,
      life: InsuranceRange.regular
    } as const

    return request(app)
      .post(ENDPOINT)
      .send(input)
      .expect(200)
      .end((_err, response) => {
        expect(response.body).toStrictEqual(output)
        done()
      })
  })

  test('Should return the model of output', (done) => {
    const input = {
      age: 25,
      dependents: 0,
      house: { ownership_status: OwnershipStatus.mortgaged },
      income: 300000,
      marital_status: MaritalStatus.single,
      risk_questions: [1, 1, 1],
      vehicle: { year: 2014 }
    }

    const output = {
      auto: InsuranceRange.economic,
      disability: InsuranceRange.regular,
      home: InsuranceRange.regular,
      life: InsuranceRange.economic
    } as const

    return request(app)
      .post(ENDPOINT)
      .send(input)
      .expect(200)
      .end((_err, response) => {
        expect(response.body).toStrictEqual(output)
        done()
      })
  })
})
