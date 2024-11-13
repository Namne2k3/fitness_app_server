import mongoose from "mongoose";
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        trim: true,
        default: ''
    },
    roomType: {
        type: String,
        enum: ['private', 'group'],
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastMessage: {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}, schemaOptions);

const Room = mongoose.model('Room', roomSchema);

export default Room
