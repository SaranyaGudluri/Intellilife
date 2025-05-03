// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//     throw new Error("MONGO_URI is missing from environment variables");
// }

// let isConnected = false;

// export const connectToDB = async () => {
//     if (isConnected) return;

//     try {
//         await mongoose.connect(MONGO_URI, {
//             dbName: "budget_app",
//         });

//         isConnected = true;
//         console.log("📌 MongoDB Connected!");
//     } catch (error) {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);
//     }
// };

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing from environment variables");
}

let isConnected = false; // Track the connection state

export const connectToDB = async () => {
    if (isConnected) {
        console.log("⚡ Using existing MongoDB connection");
        return;
    }

    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "budget_app",
        });

        isConnected = true;
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw new Error("MongoDB connection failed"); // Prevent process crash
    }
};
