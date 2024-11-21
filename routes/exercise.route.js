import express from 'express'
import { getAllExercisesByBodyPart, getAllExercisesBySearchQueryName, getExerciseById, getAllBodyPart } from '../controllers/exercise.controller.js'
import { authenticateToken } from '../middlewares/index.js'
const router = express.Router()

router.get('/getAllExercisesByBodyPart/:bodyPart', authenticateToken, getAllExercisesByBodyPart)
router.get('/getAllExercisesBySearchQueryName/:searchQueryName?', authenticateToken, getAllExercisesBySearchQueryName)
router.get('/getExerciseById/:id', authenticateToken, getExerciseById)
router.get('/getAllBodyParts', authenticateToken, getAllBodyPart)

export default router