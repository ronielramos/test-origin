
import { InteractionResult } from '../../../risk-profile/@types/risk-profile'
import { countVehicleYearScore, countHasVehicleScore } from '../../../services/score/counters/vehicle.counter'
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

  test('countScore - countHasVehicleScore - doesn\'t have one', () => {
    const initialRiskProfile = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countHasVehicleScore
    ]

    const riskProfileCalculated = countScore({ ...input, vehicle: undefined } as unknown as InteractionResult, scoreCounters, initialRiskProfile)
    expect(riskProfileCalculated.auto).toBe(false)
    expect(riskProfileCalculated.disability).toBe(1)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(1)
  })

  test('countScore - countVehicleYearScore - was produced in the last 5 years', () => {
    const riskProfileBase = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countVehicleYearScore
    ]

    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, riskProfileBase)

    expect(riskProfileCalculated.auto).toBe(2)
    expect(riskProfileCalculated.disability).toBe(1)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(1)
  })

  test('countScore - countVehicleYearScore - was produced more than 5 years ago', () => {
    const riskProfileBase = {
      auto: initialValue,
      disability: initialValue,
      home: initialValue,
      life: initialValue
    }

    const scoreCounters = [
      countVehicleYearScore
    ]

    const riskProfileCalculated = countScore({ ...input, vehicle: { year: 2014 } } as unknown as InteractionResult, scoreCounters, riskProfileBase)

    expect(riskProfileCalculated.auto).toBe(1)
    expect(riskProfileCalculated.disability).toBe(1)
    expect(riskProfileCalculated.home).toBe(1)
    expect(riskProfileCalculated.life).toBe(1)
  })
})
