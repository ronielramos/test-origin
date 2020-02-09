import { calculateRisk } from '../../risk-profile/risk-profile.service'
import { RiskQuestions } from '../../risk-profile/@types/risk-profile'
import { vehicleValidate } from '../../services/risk-calculator/vehicle'

const input = {
  age: 35,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 0,
  marital_status: 'married',
  risk_questions: [0, 1, 0],
  vehicle: { year: 2018 }
}

// const output = {
//   auto: 'regular',
//   disability: 'ineligible',
//   home: 'economic',
//   life: 'regular'
// } as const

describe('service', () => {
  let baseValue = 0

  beforeAll(() => {
    baseValue = input.risk_questions.filter((question) => question).length
  })

  test('calculateRisk - vehicleValidate - was produced in the last 5 years', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      vehicleValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(2)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - vehicleValidate - was produced more than 5 years ago', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      vehicleValidate
    ]

    const riskCalculated = calculateRisk({ ...input, vehicle: { year: 2014 } } as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })
})
