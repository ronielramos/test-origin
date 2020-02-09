import { RiskProfileModel, RiskQuestions } from '../module/risk'

import { OwnershipStatus, MaritalStatus } from '../module/risk.enum'

export const propertysAndIncomesValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (!riskQuestions.house && !riskQuestions.vehicle && !riskQuestions.income) {
    insurancePartialCalc.disability = false
    insurancePartialCalc.auto = false
    insurancePartialCalc.home = false
  }

  return insurancePartialCalc
}

export const ageValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.age > 60) {
    insurancePartialCalc.disability = false
    insurancePartialCalc.life = false
  }

  if (riskQuestions.age < 30) {
    insurancePartialCalc.auto = -2
    insurancePartialCalc.disability = -2
    insurancePartialCalc.home = -2
    insurancePartialCalc.life = -2
  }

  if (riskQuestions.age > 30 && riskQuestions.age < 40) {
    insurancePartialCalc.auto = -1
    insurancePartialCalc.disability = -1
    insurancePartialCalc.home = -1
    insurancePartialCalc.life = -1
  }

  return insurancePartialCalc
}

export const vehicleValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  const minimumYear = (new Date().getFullYear()) - 5

  if ((riskQuestions.vehicle?.year ?? 0) > minimumYear) {
    insurancePartialCalc.auto = 1
  }

  return insurancePartialCalc
}

export const houseValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.house?.ownership_status === OwnershipStatus.mortgaged) {
    insurancePartialCalc.home = 1
    insurancePartialCalc.disability = 1
  }

  return insurancePartialCalc
}

export const dependentsValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.dependents > 0) {
    insurancePartialCalc.disability = 1
    insurancePartialCalc.life = 1
  }

  return insurancePartialCalc
}

export const maritalValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = {}

  if (riskQuestions.marital_status === MaritalStatus.married) {
    insurancePartialCalc.life = 1
    insurancePartialCalc.disability = -1
  }

  return insurancePartialCalc
}

export const personalValidate = (riskQuestions: RiskQuestions): Partial<RiskProfileModel> => {
  const insurancePartialCalc: Partial<RiskProfileModel> = { }

  if (riskQuestions.income > 200_000) {
    insurancePartialCalc.auto = -1
    insurancePartialCalc.disability = -1
    insurancePartialCalc.home = -1
    insurancePartialCalc.life = -1
  }

  return insurancePartialCalc
}

/**
 *
If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.

If the user is over 60 years old, she is ineligible for disability and life insurance.
If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is between 30 and 40 years old, deduct 1.

If her income is above $200k, deduct 1 risk point from all lines of insurance.
If the user has dependents, add 1 risk point to both the disability and life scores.
If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.

If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.

If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.
 */
