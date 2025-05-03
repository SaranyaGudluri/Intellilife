import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect"; 
import Expense from "@/models/Expense"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            await dbConnect();
            const { userId, budgetId, name, amount } = req.body;

            if (!userId || !budgetId || !name || !amount) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const newExpense = await Expense.create({ userId, budgetId, name, amount });
            return res.status(201).json(newExpense);
        } catch (error) {
            return res.status(500).json({ error: "Error adding expense", details: error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}