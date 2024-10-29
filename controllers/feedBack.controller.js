import FeedBack from "../models/feedback.model.js"

export const createFeedBack = async (req, res) => {
    try {
        const newFeedback = new FeedBack(req.body)
        const savedFeedback = await newFeedback.save()
        res.status(201).json(savedFeedback)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}