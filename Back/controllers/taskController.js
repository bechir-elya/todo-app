import Task from "../model/taskModel.js";
import Info from "../model/info.js";

export const getTask = async (req, res) => {

    const userId = req.params['id'];
    const taskData = await Task.find({userId});
    res.json(taskData);
};


export const addTask = async (req, res) => {

    const data = await Task.create({
        title: req.body.title,
        content: req.body.content,
        deadline: req.body.deadline,
        priority: req.body.priority,
        userId: req.body.userId
    })
    res.json(data);
}


export const deleteTask = async (req, res) => {

    const id = req.params['id'];
    const task = await Task.findByIdAndDelete(id);
    Info.create({
        taskId: id
    })
    res.json(task);
}


export const getDeletedItem = async (req, res) => {
    const data = await Info.find();
    res.json(data);
}


export const updateTask = async (req, res) => {
    const id = req.params['id'];
    
    const task = await Task.findByIdAndUpdate(id, {
        title: req.body.title,
        content: req.body.content, 
        deadline: req.body.deadline,
        priority: req.body.priority,
        completed: req.body.completed
    }, {new: true});
    res.json(task);
}
