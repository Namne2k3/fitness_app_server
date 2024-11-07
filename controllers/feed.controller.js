import Media from "../models/media.model.js"
import multer from 'multer';

export const createFeed = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const uploadMedia = async (req, res) => {
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const fileDetails = req.files.map(file => ({
            fileUrl: file.filename,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            type: file.mimetype.startsWith('image/') ? 'image' : 'video',
        }));

        // add data to db 

        res.status(200).json({ message: 'Upload successfully', data: fileDetails }); // Return file details
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

