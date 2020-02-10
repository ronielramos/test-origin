import { InteractionResult, RiskProfileCounted } from '../../risk-profile/@types/risk-profile'

export type ScoreCounter = (riskQuestions: InteractionResult) => Partial<RiskProfileCounted>
