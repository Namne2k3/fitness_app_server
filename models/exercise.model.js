import mongoose from 'mongoose'

const ExerciseSchema = new mongoose.Schema({
    bodyPart: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true,
    },
    gifUrl: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    secondaryMuscles: {
        type: [String],
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

export default Exercise