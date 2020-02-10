import { ErrorRequestHandler } from 'express'
import { logError } from '../logger/logger'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logError(error)
  return res.status(400).json({ id: error.id ?? 0, message: error.message })
}
