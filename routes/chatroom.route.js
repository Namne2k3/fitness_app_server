import express from 'express'
import { createNewChatRoom, findChatRoomByQueries } from '../controllers/chatroom.controller.js'
import { authenticateToken } from '../middlewares/index.js'
const router = express.Router()

router.post('/create', createNewChatRoom)
router.get('/getDetail', authenticateToken, findChatRoomByQueries)

export default router