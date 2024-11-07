import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    type: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Media = mongoose.model('Media', mediaSchema);

export default Media
