import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // Store your MongoDB URI in .env.local

export const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};