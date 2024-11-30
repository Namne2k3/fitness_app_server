import createWorkoutPlans from "../libs/ai.js"
import Plan from "../models/plan.model.js";
export const updateCurrentPlanById = async (req, res) => {
    try {
        const planId = req.params.planId
        const current = req.query.current

        const updated = await Plan.findByIdAndUpdate(planId, { current: current }, { new: true })
        res.status(200).json({ message: "Update Plan Successfully", data: updated })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const createPlans = async (req, res) => {

    const plans = req.body

    try {


        // ai.js
        // const workoutPlans = await createWorkoutPlans(user, exerciseList)

        // const workoutPlans = await createWorkoutPlans(user, exerciseList)
        // const cleanedJsonString = JSON.parse(workoutPlans.candidates[0].content.parts[0].text);
        // const formattedJsonString = JSON.stringify(cleanedJsonString, null, 2);
        // console.log(formattedJsonString);


        // save plans to mongodb right there below
        const saved = await Plan.insertMany(plans)
        // const saved = await newPlan.save()



        res.status(200).json({ message: "Create New Workout Plans Successfully!", data: saved })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllPlansByUserId = async (req, res) => {
    try {
        const { _id, gender } = req.user._doc

        console.log("req user._doc >>> ", req.user._doc);


        const data = await Plan.find({ user: _id, gender: gender })
            .populate({
                path: 'user'
            })
            .populate({
                path: 'trainings',
                populate: {
                    path: 'exercises.exercise',

                }
            })

        console.log("Data : ", data);


        res.status(200).json({ message: "Lấy dữ liệu lộ trình bài tập thành công!", data: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}