import mongoose from "mongoose";

export const taskSchema = mongoose.Schema({
    title: String,
    content: String,
    deadline: Date,
    priority: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    completed: {type: Boolean, default: false}
}, {timestamps:true});

const Task = mongoose.model('Task', taskSchema);
export default Task;
