import mongoose from "mongoose";

export const infoSchema = mongoose.Schema({
    taskId: String
})

const Info = mongoose.model('Info', infoSchema);
export default Info;