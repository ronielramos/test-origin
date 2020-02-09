import { RiskQuestions, RiskValidator, RiskProfileModel, RiskProfile } from './@types/risk-profile'
import { InsuranceRange } from './@types/risk-profile.enum'
import { vehicleValidate } from '../services/risk-calculator/vehicle'
import { houseValidate } from '../services/risk-calculator/house'
import { ageValidate, maritalValidate, propertysAndIncomesValidate, dependentsValidate } from '../services/risk-calculator/user'

const normalizeRange = (value: number | boolean): InsuranceRange => {
  if (value === false) return InsuranceRange.ineligible
  if (value < 1) return InsuranceRange.economic
  if (value > 2) return InsuranceRange.responsible

  return InsuranceRange.regular
}

export const fromEntries = <Return, ListItem>(item: [string, ListItem][]): Return => {
  const defaultObj: { [key: string]: unknown } = {}

  item.forEach(([key, value]) => {
    defaultObj[key] = value
  })

  return defaultObj as unknown as Return
}

export const calculateRisk = (riskQuestion: RiskQuestions, riskCalculators: RiskValidator[], initialRiskProfile: RiskProfileModel): RiskProfileModel => {
  const keys = Object.keys(initialRiskProfile) as (keyof RiskProfileModel)[]

  const insurancesResult: Partial<RiskProfileModel>[] = riskCalculators.map(riskValidator => riskValidator(riskQuestion))

  insurancesResult.forEach(partialInsurance => {
    keys.forEach(key => {
      if (partialInsurance[key] == null) return

      const partialValueIsNumber = typeof partialInsurance[key] === 'number'
      const initialValueIsNumber = typeof initialRiskProfile[key] === 'number'

      if (partialValueIsNumber && initialValueIsNumber) (initialRiskProfile[key] as number) += (partialInsurance[key] as number)
      else initialRiskProfile[key] = false
    })
  })
  return initialRiskProfile
}

export const determinateRiskProfile = (riskQuestion: RiskQuestions): RiskProfile => {
  const riskProfileValidators = [
    vehicleValidate,
    houseValidate,
    ageValidate,
    maritalValidate,
    propertysAndIncomesValidate,
    dependentsValidate
  ]

  const baseValue = riskQuestion.risk_questions.filter((question) => question).length
  const riskProfileBase: RiskProfileModel = {
    auto: baseValue,
    disability: baseValue,
    home: baseValue,
    life: baseValue
  }

  const calculatedRiskProfile = calculateRisk(riskQuestion, riskProfileValidators, riskProfileBase)

  const riskProfile: [string, InsuranceRange][] = Object
    .entries(calculatedRiskProfile)
    .map(([key, value]) => [key, normalizeRange(value)])

  return fromEntries<RiskProfile, InsuranceRange>(riskProfile)
}
