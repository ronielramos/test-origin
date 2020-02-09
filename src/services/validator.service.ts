import { RiskQuestionsSchema } from '../module'

import { MARITAL_STATUS, OWNERSHIP_STATUS } from '../module/index.enum'
import { RiskQuestions } from '../module/index'

import Joi = require('@hapi/joi');

const riskQuestionsSchema: RiskQuestionsSchema = {
  age: Joi.number().min(0).required(),
  dependents: Joi.number().min(0).required(),
  income: Joi.number().min(0).required(),
  risk_questions: Joi.array().length(3).items(Joi.alt(0, 1, true, false)).required(),
  marital_status: Joi.alt(MARITAL_STATUS.married, MARITAL_STATUS.single).required(),
  house: Joi.object().optional().keys({ ownership_status: Joi.alt(OWNERSHIP_STATUS.mortgaged, OWNERSHIP_STATUS.owned).required() }),
  vehicle: Joi.object().optional().keys({ year: Joi.number().min(0).required() })
}

const schemaToValidate = Joi.object().keys(riskQuestionsSchema).required()

export const validateRiskQuestion = (body: unknown): RiskQuestions => {
  const validation = schemaToValidate.validate(body)
  if (validation.error) throw validation.error

  return body as RiskQuestions
}
