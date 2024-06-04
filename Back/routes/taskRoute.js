import { Router } from "express";
import { addTask, deleteTask, getDeletedItem, getTask, updateTask } from "../controllers/taskController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

router.get('/tasks/:id', verifyToken, getTask);

router.post('/addtask', verifyToken, addTask);

router.put('/updatetask/:id', updateTask);

router.delete('/deleteTask/:id', deleteTask);

router.get('/deleteditem', getDeletedItem);

export default router;
