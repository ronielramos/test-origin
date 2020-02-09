import { RiskProfileModel } from '../../risk-profile/@types/risk-profile'
import { MaritalStatus } from '../../risk-profile/@types/risk-profile.enum'
import { RiskCalculatorFN } from './risk-calculator'

export const propertysAndIncomesValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (!riskQuestions.house) insurancePartialCalc.home = false
  if (!riskQuestions.vehicle) insurancePartialCalc.auto = false
  if (!riskQuestions.income) insurancePartialCalc.disability = false

  return insurancePartialCalc
}

export const ageValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.age > 30 && riskQuestions.age < 40) {
    insurancePartialCalc.auto = -1
    insurancePartialCalc.disability = -1
    insurancePartialCalc.home = -1
    insurancePartialCalc.life = -1
    return insurancePartialCalc
  }

  if (riskQuestions.age < 30) {
    insurancePartialCalc.auto = -2
    insurancePartialCalc.disability = -2
    insurancePartialCalc.home = -2
    insurancePartialCalc.life = -2
    return insurancePartialCalc
  }

  if (riskQuestions.age > 60) {
    insurancePartialCalc.disability = false
    insurancePartialCalc.life = false
    return insurancePartialCalc
  }

  return insurancePartialCalc
}

export const dependentsValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.dependents > 0) {
    insurancePartialCalc.disability = 1
    insurancePartialCalc.life = 1
  }

  return insurancePartialCalc
}

export const maritalValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.marital_status === MaritalStatus.married) {
    insurancePartialCalc.life = 1
    insurancePartialCalc.disability = -1
  }

  return insurancePartialCalc
}

export const personalValidate: RiskCalculatorFN = riskQuestions => {
  const insurancePartialCalc: Partial<RiskProfileModel> = { }

  if (riskQuestions.income > 200_000) {
    insurancePartialCalc.auto = -1
    insurancePartialCalc.disability = -1
    insurancePartialCalc.home = -1
    insurancePartialCalc.life = -1
  }

  return insurancePartialCalc
}
