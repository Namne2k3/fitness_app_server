import express from 'express'
import { authenticateToken } from '../middlewares/index.js'
import { createPlans, getAllPlansByUserId } from '../controllers/plan.controller.js'
const router = express.Router()

router.get('/getAllPlansByUserId', authenticateToken, getAllPlansByUserId)
router.post('/createPlans', authenticateToken, createPlans)

export default router