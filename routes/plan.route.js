import express from 'express'
import { authenticateToken } from '../middlewares/index.js'
import { createPlans } from '../controllers/plan.controller.js'
const router = express.Router()

router.post('/createPlans', authenticateToken, createPlans)

export default router