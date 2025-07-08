import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const Conn = process.env.MONGO;
console.log("som errors from this page are also fixed ")
const Connect = async () => {
    try {
        await mongoose.connect(Conn);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error in connection:', error);
    }
};

export default Connect

// 