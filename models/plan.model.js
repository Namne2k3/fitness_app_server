import mongoose from 'mongoose'
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', _id: false },
};
const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trainings: [
        {
            title: {
                type: String,
            },
            exercises: [
                {
                    _id: {
                        type: String
                    },
                    id: {
                        type: Number
                    },
                    name: {
                        type: String
                    },
                    target: {
                        type: String,
                    },
                    gifUrl: {
                        type: String
                    },
                    bodyPart: {
                        type: String,
                    },
                    equipment: {
                        type: String
                    },
                    instructions: [
                        {
                            type: String,
                        }
                    ],
                    secondaryMuscles: [
                        {
                            type: String
                        }
                    ]
                }
            ]

        }
    ],
    image: {
        type: String
    }

}, schemaOptions)

const Plan = mongoose.model('Plan', planSchema)
export default Plan