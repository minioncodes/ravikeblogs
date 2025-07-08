import mongoose from "mongoose";
const UserLoginSchema = new mongoose.Schema({
    username: { type: String },
    fullname: { type: String },
    password: { type: String, required: true },
    email: { type: String, unique: true }
},{timestamps:true});

const UserModel = mongoose.model('UserLogin', UserLoginSchema);

export default UserModel;