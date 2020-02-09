import express from 'express'
import { riskQuestionValidationMiddleware } from './middleware'
import { calculateRisk } from './controller'

const router = express.Router()

router.post('/', riskQuestionValidationMiddleware, calculateRisk)

export default router
