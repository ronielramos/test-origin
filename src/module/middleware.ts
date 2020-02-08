import { RequestHandler } from 'express'
import { validateRiskQuestion } from '../services/validator.service'

export const riskQuestionValidationMiddleware: RequestHandler = (req, _res, next) => {
  try {
    validateRiskQuestion(req.body)
    next()
  } catch (e) {
    req.body.error = { message: e.message, code: 400 }
    next()
  }
}
