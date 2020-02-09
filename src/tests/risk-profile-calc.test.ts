import { calculateRisk } from '../risk-profile/risk-profile.service'
import { RiskQuestions } from '../risk-profile/@types/risk-profile'
import { vehicleValidate } from '../services/risk-calculator/vehicle'
import { houseValidate } from '../services/risk-calculator/house'
import { ageValidate, maritalValidate, propertysAndIncomesValidate, dependentsValidate } from '../services/risk-calculator/user'

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

  test('calculateRisk - vehicleValidate', () => {
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

  test('calculateRisk - houseValidate owned', () => {
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

  test('calculateRisk - houseValidate mortgaged', () => {
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

  test('calculateRisk - houseValidate mortgaged', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      ageValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(0)
    expect(riskCalculated.disability).toBe(0)
    expect(riskCalculated.home).toBe(0)
    expect(riskCalculated.life).toBe(0)
  })

  test('calculateRisk - maritalValidate', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      maritalValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(0)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(2)
  })

  test('calculateRisk - propertysAndIncomesValidate', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      propertysAndIncomesValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - dependentsValidate', () => {
    const riskProfileBase = {
      auto: baseValue,
      disability: baseValue,
      home: baseValue,
      life: baseValue
    }

    const validators = [
      dependentsValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators, riskProfileBase)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(2)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(2)
  })

  test('calculateRisk', () => {
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
