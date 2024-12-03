import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token không tồn tại' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: 'Token đã quá hạn sử dụng!' })
        }

        req.user = decoded

        console.log("Check req.user >>> ", req.user);


        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token không thích hợp!' });
    }
}

export {
    authenticateToken
}