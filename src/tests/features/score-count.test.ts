import { InteractionResult } from '../../risk-profile/@types/risk-profile'
import { countVehicleYearScore, countHasVehicleScore } from '../../services/score/counters/vehicle.counter'

import {
  countYoungPeopleAgeScore,
  countMartitalStatusScore,
  countHasIncomeScore,
  countHasDependentsScore,
  countHighIncomeScore,
  countMiddlePeopleAgeScore,
  countOlderPeopleScore
} from '../../services/score/counters/user.counter'

import { countScore } from '../../services/score/score.counter'
import { countHasHouseScore, countHouseOwnershipScore } from '../../services/score/counters/house.counter'

const input = {
  age: 35,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 0,
  marital_status: 'married',
  risk_questions: [0, 1, 0],
  vehicle: { year: 2018 }
}

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

    const scoreCounters = [
      countHasIncomeScore,
      countHasHouseScore,
      countHouseOwnershipScore,
      countHasVehicleScore,
      countVehicleYearScore,
      countHighIncomeScore,
      countMartitalStatusScore,
      countHasDependentsScore,
      countYoungPeopleAgeScore,
      countMiddlePeopleAgeScore,
      countOlderPeopleScore
    ]
    const riskProfileCalculated = countScore(input as unknown as InteractionResult, scoreCounters, riskProfileBase)

    expect(riskProfileCalculated.auto).toBeLessThanOrEqual(2)
    expect(riskProfileCalculated.auto).toBeGreaterThanOrEqual(1)

    expect(riskProfileCalculated.disability).toBe(false)

    expect(riskProfileCalculated.life).toBeLessThanOrEqual(2)
    expect(riskProfileCalculated.life).toBeGreaterThanOrEqual(1)

    expect(riskProfileCalculated.home).toBeLessThanOrEqual(0)
  })
})
