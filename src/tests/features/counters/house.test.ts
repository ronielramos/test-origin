
import { InteractionResult } from '../../../risk-profile/@types/risk-profile'
import { countHouseOwnershipScore, countHasHouseScore } from '../../../services/score/counters/house.counter'
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

  test('countScore - countHasHouseScore - doesn\'t have one', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countHasHouseScore
    ]

    const riskProfileCalculated = countScore({ ...input, house: undefined } as unknown as InteractionResult, scoreCounters, initialRiskProfile)

    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(1)
    expect(riskProfileCalculated.home).toBe(false)
    expect(riskProfileCalculated.life).toBe(1)
  })

  test('countScore - countHouseOwnershipScore - owned house', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countHouseOwnershipScore
    ]
    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, initialRiskProfile)
    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(1)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(1)
  })

  test('countScore - countHouseOwnershipScore - mortgaged house', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countHouseOwnershipScore
    ]

    const alternativeHouse = { ...input, house: { ownership_status: 'mortgaged' } }

    const riskProfileCalculated = countScore(alternativeHouse as unknown as InteractionResult, scoreCounters, initialRiskProfile)

    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(2)
    expect(riskProfileCalculated.home).toBe(2)
    expect(riskProfileCalculated.life).toBe(1)
  })
})
