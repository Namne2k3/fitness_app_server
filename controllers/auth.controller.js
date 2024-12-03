import { User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const { email, password, username, clerkId } = req.body
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "User already exists!" })
        }
        const user = await User.create(req.body)

        res.status(201).json({ user, message: "User created successfully!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [user] = await User.find({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User does not existed' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Password!' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });


        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const logout = async (req, res) => {
    res.send('logout')
}

