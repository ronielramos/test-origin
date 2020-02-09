import { RiskQuestions, RiskProfileModel } from '../../risk-profile/@types/risk-profile'

export type RiskCalculatorFN = (riskQuestions: RiskQuestions) => Partial<RiskProfileModel>
