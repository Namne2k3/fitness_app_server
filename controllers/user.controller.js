import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const user = await User.findOne({ email: email })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userBody = req.body
        const userId = req.params.userId
        const user = await User.updateOne({ _id: userId }, userBody)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updatePasswordByEmail = async (req, res) => {
    try {
        const { password } = req.body
        const email = req.params.email
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = password

        await user.save()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

        // console.log("Check token >>> ", token);


        if (!token) {
            return res.status(401).json({ message: 'Token không tồn tại' });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }
            res.status(200).json({ user: decodedUser });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const isEmailExist = async (req, res) => {
    try {
        const email = req.params.email
        const isExist = await User.findOne({ email: email })
        if (isExist) {
            res.status(200).json({ email: email })
        }
        else {
            res.status(200).json({ email: "", message: "Email was not exist!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}