import express from 'express'
import { getAllUsers, getUserById, getUserByEmail, updateUser, getCurrentUser, isEmailExist, updatePasswordByEmail, updateUserById } from '../controllers/user.controller.js'
import { authenticateToken } from '../middlewares/index.js'
const router = express.Router()

router.get('/email/:email', authenticateToken, getUserByEmail)
router.put('/email/:email', updatePasswordByEmail)
router.get('/check_email/:email', isEmailExist)
router.get('/getCurrentUser', authenticateToken, getCurrentUser)
router.get('/:id', authenticateToken, getUserById)
router.put('/:userId', authenticateToken, updateUser)
router.put('/update/updateUserById', authenticateToken, updateUserById)
router.get('/getAllUsers/', authenticateToken, getAllUsers)

export default router


