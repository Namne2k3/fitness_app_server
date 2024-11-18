import express from 'express'
import { createNewChatRoom, findChatRoomByQueries, getAllRooms, createNewMessage, getAllMessagesByRoomId, updateLastMessageForRoomChatById } from '../controllers/chatroom.controller.js'
import { authenticateToken } from '../middlewares/index.js'
const router = express.Router()

router.post('/create', authenticateToken, createNewChatRoom)
router.post('/addMessage', authenticateToken, createNewMessage)
router.get('/getDetail', authenticateToken, findChatRoomByQueries)
router.get('/getAllMessages/:roomId', authenticateToken, getAllMessagesByRoomId)
router.get('/getAll', authenticateToken, getAllRooms)
router.put('/update/:roomId', authenticateToken, updateLastMessageForRoomChatById)

export default router