import { SchemaLike, ObjectSchema } from '@hapi/joi'
import { MaritalStatus, OwnershipStatus, InsuranceRange, InsuranceType } from './risk.enum'

export interface HouseQuestion {
  ownership_status: OwnershipStatus;
}

export interface UserQuestion {
  age: number;
  dependents: number;
  income: number;
  marital_status: MaritalStatus;
  risk_questions: [boolean, boolean, boolean];
}

export interface VehicleQuestion {
  year: number;
}

export interface RiskQuestions extends UserQuestion {
  house?: HouseQuestion;
  vehicle?: VehicleQuestion;
}

export type UserQuestionSchema = Record<keyof UserQuestion, SchemaLike>
export type HouseQuestionSchema = ObjectSchema<unknown>
export type VehicleQuestionSchema = ObjectSchema<unknown>
export type RiskQuestionsSchema = UserQuestionSchema & { house: HouseQuestionSchema; vehicle: VehicleQuestionSchema }

export type RiskProfile = Record<InsuranceType, InsuranceRange>

export type RiskProfileModel = Record<InsuranceType, number | false>

export type RiskValidator = (riskQuestions: RiskQuestions) => Partial<RiskProfileModel>
