import { RiskProfileCounted } from '../../../risk-profile/@types/risk-profile'
import { MaritalStatus } from '../../../risk-profile/@types/risk-profile.enum'
import { ScoreCounter } from '../score'

export const countHasIncomeScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = {}

  if (!interactionResult.income) partialRiskProfile.disability = false

  return partialRiskProfile
}

export const countMiddlePeopleAgeScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = {}

  if (interactionResult.age > 30 && interactionResult.age < 40) {
    partialRiskProfile.auto = -1
    partialRiskProfile.disability = -1
    partialRiskProfile.home = -1
    partialRiskProfile.life = -1
  }

  return partialRiskProfile
}

export const countOlderPeopleScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = {}

  if (interactionResult.age > 60) {
    partialRiskProfile.disability = false
    partialRiskProfile.life = false
  }

  return partialRiskProfile
}

export const countYoungPeopleAgeScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = {}

  if (interactionResult.age < 30) {
    partialRiskProfile.auto = -2
    partialRiskProfile.disability = -2
    partialRiskProfile.home = -2
    partialRiskProfile.life = -2
  }

  return partialRiskProfile
}
export const countHasDependentsScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = {}

  if (interactionResult.dependents > 0) {
    partialRiskProfile.disability = 1
    partialRiskProfile.life = 1
  }

  return partialRiskProfile
}

export const countMartitalStatusScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = {}

  if (interactionResult.marital_status === MaritalStatus.married) {
    partialRiskProfile.life = 1
    partialRiskProfile.disability = -1
  }

  return partialRiskProfile
}

export const countHighIncomeScore: ScoreCounter = interactionResult => {
  const partialRiskProfile: Partial<RiskProfileCounted> = { }

  if (interactionResult.income > 200_000) {
    partialRiskProfile.auto = -1
    partialRiskProfile.disability = -1
    partialRiskProfile.home = -1
    partialRiskProfile.life = -1
  }

  return partialRiskProfile
}
