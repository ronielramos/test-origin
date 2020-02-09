import { RiskProfileModel } from '../../risk-profile/@types/risk-profile'

import { OwnershipStatus } from '../../risk-profile/@types/risk-profile.enum'
import { RiskCalculatorFN } from './risk-calculator'

export const houseValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.house?.ownership_status === OwnershipStatus.mortgaged) {
    insurancePartialCalc.home = 1
    insurancePartialCalc.disability = 1
  }

  return insurancePartialCalc
}
