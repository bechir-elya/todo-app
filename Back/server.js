import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import forgotPassRouter from './routes/forgotPasswordRoute.js';


dotenv.config();

const app = express();

const port = process.env.APP_PORT;

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(userRouter);
app.use(taskRouter);
app.use(forgotPassRouter);


connectDB();

app.listen(port, () => {console.log(`http://localhost:${port}`)});
