import { GoogleGenerativeAI } from '@google/generative-ai'

const key = process.env.GOOGLE_API_KEY
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const createWorkoutPlans = async (userData, goal) => {
  const prompt = `
    You are a fitness coach AI. Based on the user's data and fitness goal, create a 30-day structured workout plan with only strength training and rest days.  Return ONLY the JSON object; no surrounding text, explanations, or metadata.  Incorrect JSON will be rejected.

    User Data: ${userData}
    Goal: ${goal}

    Rules:
    - Alternate strength training and rest days.
    - Customize for the goal:
        - "Muscle Gain": Heavy weight, lower reps (4-6).
        - "Fat Loss": Higher reps, moderate weight (12-15).
        - "Maintenance": Balanced weight and reps (8-12).
    - Use common exercises (Bench Press, Squats, Deadlifts, etc.).
    - The JSON MUST be a single object with this structure:

    {
      "plan": [
        {"day": "Day 1", "type": "strength", "exercises": [{"name": "Exercise", "sets": 3, "reps": 10, "weight": "Weight"}]},
        {"day": "Day 2", "type": "rest", "exercises": []},
        // ... 30 days ...
      ]
    }
  `;

  try {
    const res = await model.generateContent(prompt);
    const workoutPlanText = res.response.candidates[0].content.parts[0].text;
    const startIndex = workoutPlanText.indexOf('{');
    const endIndex = workoutPlanText.lastIndexOf('}');
    const cleanedJson = workoutPlanText.substring(startIndex, endIndex + 1);
    const workoutPlan = JSON.parse(cleanedJson);

    return workoutPlan;
  } catch (error) {
    console.error("Error:", error.message || error);
  }
};


export default createWorkoutPlans;