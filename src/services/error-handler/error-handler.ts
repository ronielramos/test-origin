import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error)
  return res.status(400).json({ id: error.id ?? 0, message: error.message })
}
