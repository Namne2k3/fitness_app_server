import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token does not exist' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: 'Token was expired!' })
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid!' });
    }
}

export {
    authenticateToken
}