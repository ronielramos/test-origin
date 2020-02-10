import { RequestHandler } from 'express'
import { validatePayload } from '../services/payload-validator/payload-validator'
import { risProfileInteractionResultSchema } from './risk-profile-interaction-result.schema'

export const validationMiddleware: RequestHandler = (req, _res, next) => {
  try {
    validatePayload(req.body, risProfileInteractionResultSchema)
    next()
  } catch (e) {
    next(e)
  }
}
