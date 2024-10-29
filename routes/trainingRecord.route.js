import express from 'express'
import { createTrainingRecord, getTrainingRecord, getTrainingsByMonth, getAllTrainingRecordByUserId } from '../controllers/trainingRecord.controller.js'
const router = express.Router()
router.post('/create', createTrainingRecord)
router.get('/:id', getTrainingRecord)
router.get('/:userId/getTrainingsByMonth/:month', getTrainingsByMonth)
router.get('/:userId/getAllTrainingRecords', getAllTrainingRecordByUserId)

export default router