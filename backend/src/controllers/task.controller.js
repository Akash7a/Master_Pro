import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/AsyncHandler.util.js";
import mongoose from "mongoose";

const addNewTasks = asyncHandler(async (req, res) => {
    const { title, description, priority, status } = req.body;
    const userId = req.user?._id;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required.");
    }

    if (!userId) {
        throw new ApiError(400, "User ID is required to create new tasks.");
    }

    const createdTask = await Task.create({
        title,
        description,
        priority: priority || "medium",
        status: status || "pending",
        assignedTo: userId,
    });

    if (!createdTask) {
        throw new ApiError(500, "Failed to create a new task.");
    }

    return res.status(201).json(new ApiResponse(201, {
        message: "Task created successfully!",
        task: createdTask,
    }));
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized:User not found");
    }

    if (!id) {
        throw new ApiError(400, "Task ID is required");
    }

    const taskId =new mongoose.Types.ObjectId(id);

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (task.assignedTo.toString() !== userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only delete your own tasks");
    }

    await task.deleteOne();

    return res.status(200).json(new ApiResponse(200,
        {
            message: "Task deleted successfully!",
            deletedTask:task,
        }
    ));
});

const getTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized: User not found");
    }

    if (!id) {
        throw new ApiError(400, "Task ID is required");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (task.assignedTo.toString() !== userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only view your own tasks");
    }

    return res.status(200).json(new ApiResponse(200, {
        message: "Task fetched successfully!",
        task,
    }));
});

const deleteAllTasks = asyncHandler(async (req, res) => {
    const userId = req.user?._id;


    if (!userId) {
        throw new ApiError(401, "Unauthorized: User not found");
    }

    const result = await Task.deleteMany({ assignedTo: userId });

    if (result.deletedCount === 0) {
        throw new ApiError(404, "No tasks found to delete");
    }

    return res.status(200).json(new ApiResponse(200, {
        message: "All tasks deleted successfully!",
        deletedCount: result.deletedCount,
    }));
});

const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized: User not found");
    }

    const tasks = await Task.find({ assignedTo: userId });

    if (!tasks || tasks.length === 0) {
        return res.status(200).json(new ApiResponse(200, {
            message: "No tasks found for this user",
            tasks: [],
        }));
    }

    return res.status(200).json(new ApiResponse(200, {
        message: "Tasks fetched successfully!",
        tasks,
    }));
});

const toggleStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized: User not found");
    }

    if (!id) {
        throw new ApiError(400, "Task ID is required");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (task.assignedTo.toString() !== userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only update your own tasks");
    }

    const statusOrder = ["pending", "in-progress", "completed"];
    const currentIndex = statusOrder.indexOf(task.status);
    const newIndex = (currentIndex + 1) % statusOrder.length;

    task.status = statusOrder[newIndex];
    await task.save();

    return res.status(200).json(new ApiResponse(200, {
        message: `Task status updated to ${task.status}`,
        task,
    }));
});

const editTasks = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    const { title, description, priority, status } = req.body;

    if (!userId) {
        throw new ApiError(401, "Unauthorized: User not found");
    }

    if (!id) {
        throw new ApiError(400, "Task ID is required");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (task.assignedTo.toString() !== userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only edit your own tasks");
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;

    await task.save();

    return res.status(200).json(new ApiResponse(200, {
        message: "Task updated successfully!",
        task,
    }));
});

export {
    addNewTasks,
    deleteTask,
    deleteAllTasks,
    getTask,
    getAllTasks,
    toggleStatus,
    editTasks,
};