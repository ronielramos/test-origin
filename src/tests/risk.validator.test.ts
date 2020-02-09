import { calculateRisk } from '../module/risk.service'
import { vehicleValidate, houseValidate, ageValidate, maritalValidate, propertysAndIncomesValidate, dependentsValidate } from '../services/risk-validators'
import { RiskQuestions } from '../module/risk'
/* eslint-disable no-undef */

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
  test('calculateRisk - vehicleValidate', () => {
    const validators = [
      vehicleValidate
    ]
    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(2)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - houseValidate owned', () => {
    const validators = [
      houseValidate
    ]
    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - houseValidate mortgaged', () => {
    const validators = [
      houseValidate
    ]

    const alternativeHouse = { ...input, house: { ownership_status: 'mortgaged' } }
    const riskCalculated = calculateRisk(alternativeHouse as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(2)
    expect(riskCalculated.home).toBe(2)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - houseValidate mortgaged', () => {
    const validators = [
      ageValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(0)
    expect(riskCalculated.disability).toBe(0)
    expect(riskCalculated.home).toBe(0)
    expect(riskCalculated.life).toBe(0)
  })

  test('calculateRisk - maritalValidate', () => {
    const validators = [
      maritalValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(0)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(2)
  })

  test('calculateRisk - propertysAndIncomesValidate', () => {
    const validators = [
      propertysAndIncomesValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(1)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(1)
  })

  test('calculateRisk - dependentsValidate', () => {
    const validators = [
      dependentsValidate
    ]

    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)
    expect(riskCalculated.auto).toBe(1)
    expect(riskCalculated.disability).toBe(2)
    expect(riskCalculated.home).toBe(1)
    expect(riskCalculated.life).toBe(2)
  })

  test('calculateRisk', () => {
    const validators = [
      vehicleValidate,
      houseValidate,
      ageValidate,
      maritalValidate,
      propertysAndIncomesValidate,
      dependentsValidate
    ]
    const riskCalculated = calculateRisk(input as unknown as RiskQuestions, validators)

    expect(riskCalculated.auto).toBeLessThanOrEqual(2)
    expect(riskCalculated.auto).toBeGreaterThanOrEqual(1)

    expect(riskCalculated.disability).toBe(false)

    expect(riskCalculated.life).toBeLessThanOrEqual(2)
    expect(riskCalculated.life).toBeGreaterThanOrEqual(1)

    expect(riskCalculated.home).toBeLessThanOrEqual(0)
  })
})
