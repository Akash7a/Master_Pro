import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log(`MongoDB connected on HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed ERROR:", error);
        process.exit(1);
    }
};
