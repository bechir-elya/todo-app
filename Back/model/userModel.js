import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: String,
    resetToken: String,
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'}
});

const User = mongoose.model('User', userSchema);
export default User;