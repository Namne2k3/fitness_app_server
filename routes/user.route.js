import express from 'express'
import { getUserByEmail, updateUser, getCurrentUser, isEmailExist, updatePasswordByEmail } from '../controllers/user.controller.js'
import { authenticateToken } from '../middlewares/index.js'
const router = express.Router()

router.get('/email/:email', authenticateToken, getUserByEmail)
router.put('/email/:email', updatePasswordByEmail)
router.get('/check_email/:email', isEmailExist)
router.get('/getCurrentUser', authenticateToken, getCurrentUser)
router.put('/:userId', authenticateToken, updateUser)

export default router


