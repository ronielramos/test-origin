import { calculateRisk } from '../../risk-profile/risk-profile.service'
import { RiskQuestions } from '../../risk-profile/@types/risk-profile'
import { vehicleValidate } from '../../services/risk-calculator/vehicle'
import { houseValidate } from '../../services/risk-calculator/house'
import { ageValidate, maritalValidate, propertysAndIncomesValidate, dependentsValidate } from '../../services/risk-calculator/user'

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

describe('risk-profile-service', () => {
  let baseValue = 0

  beforeAll(() => {
    baseValue = input.risk_questions.filter((question) => question).length
  })

  test('calculateRisk with all calculations activated', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      vehicleValidate,
      houseValidate,
      ageValidate,
      maritalValidate,
      propertysAndIncomesValidate,
      dependentsValidate
    ]
    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)

    expect(riskCalculated.auto).toBeLessThanOrEqual(2)
    expect(riskCalculated.auto).toBeGreaterThanOrEqual(1)

    expect(riskCalculated.disability).toBe(false)

    expect(riskCalculated.life).toBeLessThanOrEqual(2)
    expect(riskCalculated.life).toBeGreaterThanOrEqual(1)

    expect(riskCalculated.home).toBeLessThanOrEqual(0)
  })
})
