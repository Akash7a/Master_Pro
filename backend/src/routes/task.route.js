import { Router } from "express";
import {
    addNewTasks,
    deleteAllTasks
    , deleteTask
    , editTasks,
    getAllTasks,
    getTask
    , toggleStatus
} from "../controllers/task.controller.js";
import { verify } from "../middlewares/auth.middleware.js";

const taskRouter = Router();

taskRouter.route("/addnewTask").post(verify,addNewTasks);
taskRouter.route("/getTask/:id").get(verify,getTask);
taskRouter.route("/getAllTask").get(verify,getAllTasks);
taskRouter.route("/editTask/:id").put(verify,editTasks);
taskRouter.route("/deleteAllTasks").delete(verify,deleteAllTasks);
taskRouter.route("/deleteSingleTask/:id").delete(verify,deleteTask);
taskRouter.route("/toggleTask/:id").put(verify,toggleStatus);

export {
    taskRouter,
}