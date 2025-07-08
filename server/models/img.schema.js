import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'UserLogin',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    size: {
        type: Number, 
    },
})
const ImageModel = mongoose.model('Image', ImageSchema);
export default ImageModel