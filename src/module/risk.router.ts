import express from 'express'
import { validationMiddleware } from './risk.middleware'
import { calculate } from './risk.controller'

const router = express.Router()

router.post('/', validationMiddleware, calculate)

export default router
