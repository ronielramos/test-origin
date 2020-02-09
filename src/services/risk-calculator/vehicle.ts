import { RiskProfileModel } from '../../risk-profile/@types/risk-profile'
import { RiskCalculatorFN } from './risk-calculator'

export const vehicleValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  const minimumYear = (new Date().getFullYear()) - 5

  if ((riskQuestions.vehicle?.year ?? 0) > minimumYear) {
    insurancePartialCalc.auto = 1
  }

  return insurancePartialCalc
}
