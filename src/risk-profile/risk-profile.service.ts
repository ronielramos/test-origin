import { InteractionResult, RiskProfileCounted, RiskProfile } from './@types/risk-profile'
import { InsuranceRange } from './@types/risk-profile.enum'
import { countHouseOwnershipScore, countHasHouseScore } from '../services/score/counters/house.counter'
import { countVehicleYearScore, countHasVehicleScore } from '../services/score/counters/vehicle.counter'
import { countHasIncomeScore, countHasDependentsScore, countMartitalStatusScore, countHighIncomeScore, countYoungPeopleAgeScore, countMiddlePeopleAgeScore, countOlderPeopleScore } from '../services/score/counters/user.counter'
import { countScore } from '../services/score/score.counter'

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
  const scoreCounters = [
    countHasIncomeScore,
    countHasHouseScore,
    countHouseOwnershipScore,
    countHasVehicleScore,
    countVehicleYearScore,
    countHasDependentsScore,
    countMartitalStatusScore,
    countHighIncomeScore,
    countYoungPeopleAgeScore,
    countMiddlePeopleAgeScore,
    countOlderPeopleScore
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
