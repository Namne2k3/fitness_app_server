import multer from 'multer';
import path from 'path';

const maxSize = 10 * 1024 * 1024;

// Cấu hình Multer để lưu video vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Chỉ định thư mục lưu video
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Giới hạn kích thước file là 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // Kiểm tra đuôi file

        if (extname) {
            return cb(null, true);
        }
        cb(new Error('File type is not allowed'));
    }
}).array('files', 10);


const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.log("Check err >>> ", err);

        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds the limit of 10MB' });
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') { // Xử lý lỗi nếu vượt quá số lượng tệp
            return res.status(400).json({ message: 'Exceeded the maximum number of files (10)' });
        }
    } else if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};

export {
    upload, handleMulterErrors
}
