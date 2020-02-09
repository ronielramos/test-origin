import { calculateRisk } from '../../risk-profile/risk-profile.service'
import { RiskQuestions } from '../../risk-profile/@types/risk-profile'
import { houseValidate } from '../../services/risk-calculator/house'

const input = {
  age: 35,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 0,
  marital_status: 'married',
  risk_questions: [0, 1, 0],
  vehicle: { year: 2018 }
}

describe('service', () => {
  let baseValue = 0

  beforeAll(() => {
    baseValue = input.risk_questions.filter((question) => question).length
  })

  test('calculateRisk - houseValidate - owned house', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      houseValidate
    ]
    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - houseValidate - mortgaged house', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      houseValidate
    ]

    const alternativeHouse = { ...input, house: { ownership_status: 'mortgaged' } }
    const riskCalculated = calculateRisk(alternativeHouse as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(2)
    expect(riskCalculated.home).toBe(2)
    expect(riskCalculated.life).toBe(1)
  })
})
