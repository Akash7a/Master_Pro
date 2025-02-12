import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path: "../.env",
});
const app = express();

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { userRouter } from "./routes/user.route.js";
import { taskRouter } from "./routes/task.route.js";

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

export default app;