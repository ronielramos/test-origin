import { InteractionResult } from '../../../risk-profile/@types/risk-profile'

import {
  countYoungPeopleAgeScore,
  countMartitalStatusScore,
  countHasIncomeScore,
  countHasDependentsScore,
  countMiddlePeopleAgeScore,
  countOlderPeopleScore
} from '../../../services/score/counters/user.counter'

import { countScore } from '../../../services/score/score.counter'

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
  let initialValue = 0

  beforeAll(() => {
    initialValue = input.risk_questions.filter((question) => question).length
  })

  test('countScore - ageValidate - 35 years old', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countYoungPeopleAgeScore,
      countMiddlePeopleAgeScore,
      countOlderPeopleScore
    ]

    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, initialRiskProfile)
    expect(riskProfileCalculated.auto).toBe(0)
    expect(riskProfileCalculated.disability).toBe(0)
    expect(riskProfileCalculated.home).toBe(0)
    expect(riskProfileCalculated.life).toBe(0)
  })

  test('countScore - maritalValidate - user is married', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countMartitalStatusScore
    ]

    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, initialRiskProfile)
    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(0)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(2)
  })

  test('countScore - propertysAndIncomesValidate', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countHasIncomeScore
    ]

    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, initialRiskProfile)
    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(false)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(1)
  })

  test('countScore - dependentsValidate', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countHasDependentsScore
    ]

    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, initialRiskProfile)
    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(2)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(2)
  })
})
