import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from '../server/routes/auth.route.js';
import customTrainingsRoutes from '../server/routes/customTrainingsRoutes.route.js';
import trainingRecordRoutes from '../server/routes/trainingRecord.route.js';
import userRoutes from '../server/routes/user.route.js';
import feedbackRoutes from '../server/routes/feedback.route.js';
import feedRoutes from '../server/routes/feed.route.js';
import charRoomRoutes from '../server/routes/chatroom.route.js';
import planRoutes from '../server/routes/plan.route.js';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { connectDb } from './libs/db.js';
import { connectDbMySql } from './libs/mysqldb.js';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

// Tạo __filename và __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8081',
        credentials: true,
    },
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/customtrainings', customTrainingsRoutes);
app.use('/api/trainingrecord', trainingRecordRoutes);
app.use('/api/user', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/chatroom', charRoomRoutes);
app.use('/api/plan', planRoutes);

let chatRooms = [

]
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`)

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
    });

    socket.on('createPrivateRoom', ({ userId, userProfileId }) => {

        const roomId = [userId, userProfileId].sort().join("_");

        const existingRoom = chatRooms.find((room) => room._id === roomId);
        if (!existingRoom) {
            // Nếu chưa tồn tại, tạo mới phòng chat
            chatRooms.unshift({ _id: roomId, roomType: "private", members: [userId, userProfileId], messages: [] });
        }

        socket.join(roomId)

        socket.emit("roomsList", chatRooms);

    })

    socket.on("sendMessage", ({ roomId, senderId, content }) => {
        const message = { senderId, content, created_at: new Date(), roomId: roomId };
        console.log("Sending message:", message);

        // Phát tin nhắn tới tất cả người dùng trong phòng, bao gồm cả socket hiện tại
        io.to(roomId).emit("newMessage", message);
    })

    socket.on('disconnect', (reason) => {
        socket.disconnect()
        console.log(`Socket ${socket.id} disconnected due to ${reason}`);
    });
});

server.listen(PORT, async () => {
    await connectDb();

    // await connectDbMySql();
    console.log(`Server is running on port ${PORT}`);
});
