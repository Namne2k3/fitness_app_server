import Training from "../models/training.model.js";

export const createTrainings = async (req, res) => {
    try {

        const trainings = await Training.insertMany(req.body)

        res.status(200).json({ message: "Tạo dữ liệu training thành công!", data: trainings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByUserId = async (req, res) => {
    try {

        const userId = req.user.id
        const isCustom = req.query.isCustom
        const isInPlan = req.query.isInPlan

        const data = await Training.find({ user: userId, isCustom: isCustom, isInPlan: isInPlan }).populate('exercises.exercise')

        res.status(200).json({ message: "Lấy dữ liệu training thành công!", data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};