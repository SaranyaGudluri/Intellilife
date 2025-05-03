import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(MONGODB_URI, {
                dbName: "budgetApp",
            });
        }
        res.status(200).json({ message: "Connected to MongoDB successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
}