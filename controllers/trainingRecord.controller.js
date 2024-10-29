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
        const training = await TrainingRecord.findById(id).populate("user").populate("training")
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
        const userId = req.params.userId;
        const offset = parseInt(req.query.offset) || 0;  // Default offset is 0
        const limit = parseInt(req.query.limit);  // No default for limit

        console.log("Check offset >>> ", offset);
        console.log("Check limit >>> ", limit);

        // Build the query
        let query = TrainingRecord.find({ user: userId }).sort({ created_at: -1 });

        // Apply pagination if limit or offset is provided
        if (!isNaN(limit) && limit > 0) {
            query = query.limit(limit);  // Apply limit if provided and valid
        }

        if (offset > 0) {
            query = query.skip(offset);  // Apply offset if provided and valid
        }

        // Fetch records
        const countRecords = await query;

        res.status(200).json(countRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getTrainingsByMonth = async (req, res) => {


    try {
        const month = req.params.month
        const userId = req.params.userId
        const year = new Date().getFullYear();
        const startOfMonth = new Date(year, month - 1, 1);
        const startOfNextMonth = new Date(year, month, 1);

        const records = await TrainingRecord.find({
            user: userId,
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