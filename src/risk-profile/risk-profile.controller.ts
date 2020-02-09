import express from 'express'
import { validationMiddleware } from './risk-profile.middleware'
import { RiskQuestions } from './@types/risk-profile'
import { determinateRiskProfile } from './risk-profile.service'
import { errorHandler } from '../services/error-handler/error-handler'

const router = express.Router()

router.post('/risk/profile', validationMiddleware, (req, res, next) => {
  try {
    const riskQuestions: RiskQuestions = req.body
    const riskProfile = determinateRiskProfile(riskQuestions)

    return res.json(riskProfile)
  } catch (e) {
    return next(e)
  }
})

router.use(errorHandler)

export default router
