
import { RiskQuestionsSchema } from '../../../risk-profile/@types/risk-profile'
import { MaritalStatus, OwnershipStatus } from '../../../risk-profile/@types/risk-profile.enum'
import Joi = require('@hapi/joi');

const riskQuestionsSchema: RiskQuestionsSchema = {
  age: Joi.number().min(0).integer().required(),
  dependents: Joi.number().integer().min(0).required(),
  income: Joi.number().integer().min(0).required(),
  risk_questions: Joi.array().length(3).items(Joi.alt(0, 1, true, false)).required(),
  marital_status: Joi.alt(MaritalStatus.married, MaritalStatus.single).required(),
  house: Joi.object().optional().keys({ ownership_status: Joi.alt(OwnershipStatus.mortgaged, OwnershipStatus.owned).required() }),
  vehicle: Joi.object().optional().keys({ year: Joi.number().integer().min(0).required() })
}

export default Joi.object().keys(riskQuestionsSchema).required()
