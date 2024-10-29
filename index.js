import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from '../server/routes/auth.route.js'
import customTrainingsRoutes from '../server/routes/customTrainingsRoutes.route.js'
import trainingRecordRoutes from '../server/routes/trainingRecord.route.js'
import userRoutes from '../server/routes/user.route.js'
import feedbackRoutes from '../server/routes/feedback.route.js'
import cors from 'cors'
import { connectDb } from './libs/db.js';
import { connectDbMySql } from './libs/mysqldb.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/customtrainings', customTrainingsRoutes)
app.use('/api/trainingrecord', trainingRecordRoutes)
app.use('/api/user', userRoutes)
app.use('/api/feedback', feedbackRoutes)

app.listen(PORT, async () => {
    await connectDb()
    // await connectDbMySql()
    console.log(`Server is running on port ${PORT}`);
})