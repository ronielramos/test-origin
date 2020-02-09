import { RiskQuestions, RiskValidator, RiskProfileModel } from './risk'

export const calculateRisk = (riskQuestion: RiskQuestions, riskValidators: RiskValidator[]): RiskProfileModel => {
  const baseValue = riskQuestion.risk_questions.filter((question) => question).length

  const insuranceResult: RiskProfileModel = {
    auto: baseValue,
    disability: baseValue,
    home: baseValue,
    life: baseValue
  }

  const keys = Object.keys(insuranceResult) as (keyof RiskProfileModel)[]

  const insurancesResult: Partial<RiskProfileModel>[] = riskValidators.map(riskValidator => riskValidator(riskQuestion))

  insurancesResult.forEach((partialInsurance) => {
    for (const key of keys) {
      if (
        typeof partialInsurance[key] === 'number' &&
        typeof insuranceResult[key] === 'number'
      ) {
        (insuranceResult[key] as number) += (partialInsurance[key] as number)
      }
    }
  })

  return insuranceResult
}
