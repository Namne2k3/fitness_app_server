import createWorkoutPlans from "../libs/ai.js"

export const createPlans = async (req, res) => {

    const user = req.user;
    const exerciseList = req.body

    try {


        // ai.js
        // const workoutPlans = await createWorkoutPlans(user, exerciseList)


        const workoutPlans = await createWorkoutPlans(user, exerciseList)
        const cleanedJsonString = JSON.parse(workoutPlans.candidates[0].content.parts[0].text);
        const formattedJsonString = JSON.stringify(cleanedJsonString, null, 2);
        console.log(formattedJsonString);

        // save plans to mongodb right there below

        res.status(200).json({ message: "Create New Workout Plans Successfully!", data: workoutPlans })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}