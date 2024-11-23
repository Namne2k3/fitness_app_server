import mongoose from "mongoose";

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const TrainingSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Bài tập mới'
    },
    image: {
        type: String,
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    exercises: [
        {
            exercise: {
                name: {
                    type: String,
                    required: true,
                },
                target: {
                    type: String,
                    required: true,
                },
                gifUrl: {
                    type: String,
                    required: true
                },
                id: {
                    type: String,
                },
                bodyPart: {
                    type: String
                },
                equipment: {
                    type: String
                },
                instructions: {
                    type: Array
                },
                secondaryMuscles: {
                    type: Array
                }
            },
            sets: [
                {
                    kilogram: {
                        type: Number,
                        min: [0, 'Phải lớn hơn hoặc bằng 0'],
                    },
                    reps: {
                        type: Number,
                        min: [1, 'Phải lớn hơn hoặc bằng 1'],
                    },
                    isCheck: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

const Training = mongoose.model('Training', TrainingSchema);

export default Training