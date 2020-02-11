import { RiskProfileCounted } from '../../../risk-profile/@types/risk-profile'
import { OwnershipStatus } from '../../../risk-profile/@types/risk-profile.enum'
import { ScoreCounter } from '../score'

export const countHouseOwnershipScore: ScoreCounter = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileCounted> = {}

  if (riskQuestions.house?.ownership_status === OwnershipStatus.mortgaged) {
    insurancePartialCalc.home = 1
    insurancePartialCalc.disability = 1
  }

  return insurancePartialCalc
}

export const countHasHouseScore: ScoreCounter = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileCounted> = {}

  if (!riskQuestions.house) insurancePartialCalc.home = false

  return insurancePartialCalc
}
