import { InteractionResult, RiskProfileCounted, RiskProfile } from './@types/risk-profile'
import { InsuranceRange } from './@types/risk-profile.enum'
import { countScore } from '../services/score/score.counter'
import { ScoreCounter } from '../services/score/score'
import * as UserCounters from '../services/score/counters/user.counter'
import * as HouseCounter from '../services/score/counters/house.counter'
import * as VehicleCounter from '../services/score/counters/vehicle.counter'

const normalizeRange = (value: number | boolean): InsuranceRange => {
  if (value === false) return InsuranceRange.ineligible
  if (value < 1) return InsuranceRange.economic
  if (value > 2) return InsuranceRange.responsible

  return InsuranceRange.regular
}

const fromEntries = <Return, ListItem>(item: [string, ListItem][]): Return => {
  const defaultObj: { [key: string]: unknown } = {}

  item.forEach(([key, value]) => {
    defaultObj[key] = value
  })

  return defaultObj as unknown as Return
}

export const determinateRiskProfile = (interactionResult: InteractionResult): RiskProfile => {
  const scoreCounters: ScoreCounter[] = [
    UserCounters.countHasIncomeScore,
    UserCounters.countHasDependentsScore,
    UserCounters.countMartitalStatusScore,
    UserCounters.countHighIncomeScore,
    UserCounters.countYoungPeopleAgeScore,
    UserCounters.countMiddlePeopleAgeScore,
    UserCounters.countOlderPeopleScore,
    HouseCounter.countHasHouseScore,
    HouseCounter.countHouseOwnershipScore,
    VehicleCounter.countHasVehicleScore,
    VehicleCounter.countVehicleYearScore
  ]

  const initialValue = interactionResult.risk_questions.filter((question) => question).length
  const initialRiskProfile: RiskProfileCounted = {
    auto: initialValue,
    disability: initialValue,
    home: initialValue,
    life: initialValue
  }

  const calculatedRiskScore = countScore(interactionResult, scoreCounters, initialRiskProfile)

  const riskProfile: [string, InsuranceRange][] = Object
    .entries(calculatedRiskScore)
    .map(([key, value]) => [key, normalizeRange(value)])

  return fromEntries<RiskProfile, InsuranceRange>(riskProfile)
}
