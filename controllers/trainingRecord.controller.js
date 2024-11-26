import TrainingRecord from "../models/trainingRecord.model.js";

export const createTrainingRecord = async (req, res) => {
    try {
        const recordData = req.body;
        const newTrainingRecord = new TrainingRecord(recordData)
        const savedRecord = await newTrainingRecord.save()

        res.status(201).json(savedRecord)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getTrainingRecord = async (req, res) => {
    try {
        const id = req.params.id
        const training = await TrainingRecord.findById(id)
            .populate("user")
            .populate({
                path: 'training',
                populate: {
                    path: 'exercises.exercise',

                }
            })
        res.status(200).json(training)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// export const getAllTrainingRecordByUserId = async (req, res) => {
//     try {
//         const userId = req.params.userId
//         const countRecords = await TrainingRecord.find({ user: userId })
//         res.status(200).json(countRecords)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const getAllTrainingRecordByUserId = async (req, res) => {
    try {
        const { _id } = req.user._doc;
        // const offset = parseInt(req.query.offset) || 0;  // Default offset is 0
        // const limit = parseInt(req.query.limit);  // No default for limit

        // // Build the query
        const data = await TrainingRecord.find({ user: _id })
            .populate({
                path: 'training',
                populate: {
                    path: 'exercises.exercise',

                }
            })
            .limit(3)
            .sort({ created_at: -1 });

        // // Apply pagination if limit or offset is provided
        // if (!isNaN(limit) && limit > 0) {
        //     query = query.limit(limit);  // Apply limit if provided and valid
        // }

        // if (offset > 0) {
        //     query = query.skip(offset);  // Apply offset if provided and valid
        // }

        // Fetch records
        // const countRecords = await query;

        res.status(200).json({ message: "Lấy dữ liệu lịch sử thành công", data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getTrainingsByMonth = async (req, res) => {


    try {
        const month = req.params.month
        const { _id } = req.user._doc;

        console.log("Check month >>> ", month);
        console.log("Check _id >>> ", _id);



        const year = new Date().getFullYear();
        const startOfMonth = new Date(year, month - 1, 1);
        const startOfNextMonth = new Date(year, month, 1);

        const records = await TrainingRecord.find({
            user: _id,
            created_at: {
                $gte: startOfMonth,
                $lt: startOfNextMonth
            }
        }).sort({ created_at: -1 })

        res.status(200).json(records)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}