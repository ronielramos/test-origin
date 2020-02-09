import { RequestHandler } from 'express'
import { validatePayload } from '../services/payload-validator/payload-validator'
import ristQuestionSchema from '../services/payload-validator/schemas/risk-questions'

export const validationMiddleware: RequestHandler = (req, _res, next) => {
  try {
    validatePayload(req.body, ristQuestionSchema)
    next()
  } catch (e) {
    next(e)
  }
}
