import mongoose from 'mongoose'

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const BlogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medias: {
        type: [
            {
                url: String,
                type: {
                    type: String,
                    enum: ['image', 'video'],
                }
            }
        ],
        default: []
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: []
        }
    ],
    allowComment: {
        type: Boolean,
        default: true
    }
}, schemaOptions);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog