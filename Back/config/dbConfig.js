import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://bechirelya:5XoqBPIpcpok5IKk@bechircluster.r2qf9du.mongodb.net/todo-app');
        console.log('Connected');
    } catch (error) {
        console.log(error);
    }
}