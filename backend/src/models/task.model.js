import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            index: true,
            lowercase: true,
        },
        status: {
            type: String,
            enum: ["completed", "pending", "in-progress"],
            default: "pending",
            index: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
            index: true,
        },
        assignedTo:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:false,
        }
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("Task", taskSchema);