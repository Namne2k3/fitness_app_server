import express from 'express'
import { createTrainings, getByUserId } from '../controllers/training.controller.js'
import { authenticateToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create', authenticateToken, createTrainings)
router.get('/getByUserId', authenticateToken, getByUserId)


export default router