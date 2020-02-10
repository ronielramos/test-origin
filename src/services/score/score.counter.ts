import { InteractionResult, ScoreCount, RiskProfileCounted } from '../../risk-profile/@types/risk-profile'

export const countScore = (riskQuestion: InteractionResult, scoreCounters: ScoreCount[], initialRiskProfile: RiskProfileCounted): RiskProfileCounted => {
  const insurances = Object.keys(initialRiskProfile) as (keyof RiskProfileCounted)[]

  const riskProfileScored = { ...initialRiskProfile }

  const partialRiskProfiles: Partial<RiskProfileCounted>[] = scoreCounters.map(scoreCount => scoreCount(riskQuestion))

  partialRiskProfiles.forEach(partialRiskProfile => {
    insurances.forEach(insurance => {
      if (partialRiskProfile[insurance] == null) return

      const partialValueIsNumber = typeof partialRiskProfile[insurance] === 'number'
      const scoredValueIsNumber = typeof riskProfileScored[insurance] === 'number'

      if (partialValueIsNumber && scoredValueIsNumber) (riskProfileScored[insurance] as number) += (partialRiskProfile[insurance] as number)
      else riskProfileScored[insurance] = false
    })
  })

  return riskProfileScored
}
