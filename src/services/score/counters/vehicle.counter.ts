import { RiskProfileCounted } from '../../../risk-profile/@types/risk-profile'
import { ScoreCounter } from '../score'

export const countVehicleYearScore: ScoreCounter = interactionResult => {
  const insurancePartialCalc: Partial<RiskProfileCounted> = {}

  const minimumYear = (new Date().getFullYear()) - 5

  if ((interactionResult.vehicle?.year ?? 0) > minimumYear) {
    insurancePartialCalc.auto = 1
  }

  return insurancePartialCalc
}

export const countHasVehicleScore: ScoreCounter = interactionResult => {
  const insurancePartialCalc: Partial<RiskProfileCounted> = {}

  if (!interactionResult.vehicle) insurancePartialCalc.auto = false

  return insurancePartialCalc
}
