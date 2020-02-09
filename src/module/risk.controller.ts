import { RequestHandler } from 'express'
import { RiskQuestions } from './risk'

export const calculate: RequestHandler = (req, res): unknown => {
  if (req.body.error) {
    const error: { code: number; message: string } = req.body.error
    return res.status(error.code).json({ number: 1, message: error.message })
  }

  const riskQuestions: RiskQuestions = req.body

  return res.json({ result: riskQuestions })
}
