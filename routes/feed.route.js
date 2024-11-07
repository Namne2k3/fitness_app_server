import express from 'express'
import { createFeed, uploadMedia } from '../controllers/feed.controller.js'
import { authenticateToken } from '../middlewares/index.js'
import { upload, handleMulterErrors } from '../multerConfig.js'
const router = express.Router()

router.post(
    '/uploads',
    authenticateToken,
    (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                return handleMulterErrors(err, req, res, next);
            }
            next();
        });
    },
    uploadMedia
)

router.post(
    '/create',
    authenticateToken,
    createFeed
)

export default router