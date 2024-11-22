import Exercise from "../models/exercise.model.js";
// Các bộ phận cơ thể (bodyPart) trong dữ liệu:
// Bắp tay
// Cardio
// Cẳng chân
// Cẳng tay
// Eo
// Lưng
// Neck (cổ)
// Ngực
// Vai
// Đùi
export const getAllExercisesByBodyPart = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10
        const skip = parseInt(req.query.skip) || 0
        const bodyPart = req.params.bodyPart

        console.log("bodyPart:", bodyPart);


        const data = await Exercise.find({
            bodyPart: bodyPart
        })
            .skip(skip)
            .limit(limit)

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No exercises data found!' });
        }


        res.status(200).json({ message: "Fetch Exercises Data Successfully!", data: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllExercisesBySearchQueryName = async (req, res) => {
    try {
        const searchQueryName = req.params.searchQueryName || "";
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        console.log("Check searchQueryName >>> ", searchQueryName);
        console.log("Check limit >>> ", limit);
        console.log("Check skip >>> ", skip);

        const filter = searchQueryName
            ? { name: { $regex: searchQueryName, $options: 'i' } }
            : {};

        const data = await Exercise.find(filter)
            .skip(skip)
            .limit(limit);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No exercises data found!' });
        }

        res.status(200).json({ message: "Fetch Exercises Data Successfully!", data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getExerciseById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Id is invalid!' });
        }

        const data = await Exercise.findById(id)

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No exercises data found!' });
        }

        res.status(200).json({ message: "Fetch Exercise Data By Id Successfully!", data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getAllBodyPart = async (req, res) => {
    try {
        // Sử dụng aggregate để nhóm và đếm số lần xuất hiện của từng bodyPart
        const data = await Exercise.aggregate([
            { $group: { _id: "$bodyPart", count: { $sum: 1 } } },
            { $sort: { count: -1 } } // Sắp xếp theo số lượng giảm dần (tùy chọn)
        ]);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No bodyParts data found!' });
        }

        res.status(200).json({
            message: "Fetch bodyPart data successfully!",
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

