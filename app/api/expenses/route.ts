// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // Ensure you have a database connection
// import Expense from "@/models/Expense"; // Ensure you have an Expense model

// export async function POST(req: Request) {
//     try {
//         await dbConnect();
//         const { userId, budgetId, name, amount } = await req.json();

//         if (!userId || !budgetId || !name || !amount) {
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         const newExpense = await Expense.create({ userId, budgetId, name, amount });
//         return NextResponse.json(newExpense, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: "Error adding expense", details: error }, { status: 500 });
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expense";
import Budget from "@/models/Budget";

// ✅ Handle GET request: Fetch user expenses
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        // ✅ Fetch expenses for the user
        const expenses = await Expense.find({ userId });

        return NextResponse.json(expenses, { status: 200 });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Handle POST request: Add an expense & update budget
export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { userId, budgetId, name, amount } = await req.json();

        if (!userId || !budgetId || !name || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // ✅ Create new expense
        const newExpense = await Expense.create({ userId, budgetId, name, amount });

        // ✅ Update budget: Increment `spent` and decrement `remaining`
        const updatedBudget = await Budget.findByIdAndUpdate(
            budgetId,
            { 
                $inc: { spent: amount, remaining: -amount }  // 💡 Fix: Reduce remaining too!
            },
            { new: true }
        );

        return NextResponse.json({ newExpense, updatedBudget }, { status: 201 });
    } catch (error) {
        console.error("Error adding expense:", error);
        return NextResponse.json({ error: "Error adding expense" }, { status: 500 });
    }
}