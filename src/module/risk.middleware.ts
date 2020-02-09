import { RequestHandler } from 'express'
import { validatePayload } from '../services/payload-validator.service'

export const validationMiddleware: RequestHandler = (req, _res, next) => {
  try {
    validatePayload(req.body)
    next()
  } catch (e) {
    req.body.error = { message: e.message, code: 400 }
    next()
  }
}
