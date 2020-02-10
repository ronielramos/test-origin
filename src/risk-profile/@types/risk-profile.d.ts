import { SchemaLike, ObjectSchema } from '@hapi/joi'
import { MaritalStatus, OwnershipStatus, InsuranceRange, InsuranceType } from './risk-profile.enum'

export interface HouseInfo {
  ownership_status: OwnershipStatus;
}

export interface UserInfo {
  age: number;
  dependents: number;
  income: number;
  marital_status: MaritalStatus;
  risk_questions: [boolean, boolean, boolean];
}

export interface VehicleInfo {
  year: number;
}

export interface InteractionResult extends UserInfo {
  house?: HouseInfo;
  vehicle?: VehicleInfo;
}

export type UserInfoSchema = Record<keyof UserInfo, SchemaLike>
export type HouseInfoSchema = ObjectSchema<unknown>
export type VehicleInfoSchema = ObjectSchema<unknown>
export type InteractionResultSchema = UserInfoSchema & { house: HouseInfoSchema; vehicle: VehicleInfoSchema }

export type RiskProfile = Record<InsuranceType, InsuranceRange>

export type RiskProfileCounted = Record<InsuranceType, number | false>

export type ScoreCount = (interactionResult: InteractionResult) => Partial<RiskProfileCounted>
