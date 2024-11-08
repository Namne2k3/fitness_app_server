import express from 'express'
import { createFeed, uploadMedia, getAllBlogs } from '../controllers/feed.controller.js'
import { authenticateToken } from '../middlewares/index.js'
import { upload, handleMulterErrors, resizeImage } from '../multerConfig.js'
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
    resizeImage,
    uploadMedia
)

router.post(
    '/create',
    authenticateToken,
    createFeed
)

router.get('/getAll', getAllBlogs)

export default router