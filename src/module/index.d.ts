import { SchemaLike, ObjectSchema } from '@hapi/joi'
import { MARITAL_STATUS, OWNERSHIP_STATUS } from './index.enum'

export interface HouseQuestion {
  ownership_status: OWNERSHIP_STATUS;
}

export interface UserQuestion {
  age: number;
  dependents: number;
  income: number;
  marital_status: MARITAL_STATUS;
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
