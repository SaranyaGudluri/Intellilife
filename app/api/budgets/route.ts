// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongodb";
// import Budget from "@/models/Budget";
// import Expense from "@/models/Expense";

// // ✅ GET Request: Fetch budgets for a user
// export async function GET(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get("userId");

//         if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

//         const budgets = await Budget.find({ userId });
//         return NextResponse.json(budgets);
//     } catch (error) {
//         return NextResponse.json({ error: "Error fetching budgets" }, { status: 500 });
//     }
// }

// // ✅ POST Request: Add a new budget
// export async function POST(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { userId, name, amount } = await req.json();

//         if (!userId || !name || !amount) {
//             return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//         }

//         // ✅ Initialize remaining amount as total amount
//         const newBudget = await Budget.create({ userId, name, amount, remaining: amount });

//         return NextResponse.json(newBudget);
//     } catch (error) {
//         return NextResponse.json({ error: "Error creating budget" }, { status: 500 });
//     }
// }

// // ✅ PATCH Request: Update remaining budget
// export async function PATCH(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const budgetId = searchParams.get("budgetId");
//         const { remaining } = await req.json();

//         if (!budgetId || remaining === undefined) {
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         const updatedBudget = await Budget.findByIdAndUpdate(
//             budgetId,
//             { remaining },
//             { new: true }
//         );

//         if (!updatedBudget) {
//             return NextResponse.json({ error: "Budget not found" }, { status: 404 });
//         }

//         return NextResponse.json(updatedBudget);
//     } catch (error) {
//         return NextResponse.json({ error: "Error updating budget" }, { status: 500 });
//     }
// }

// // ✅ DELETE Request: Delete a budget and its expenses
// export async function DELETE(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const budgetId = searchParams.get("budgetId");

//         if (!budgetId) {
//             return NextResponse.json({ error: "Missing budgetId" }, { status: 400 });
//         }

//         // ✅ Delete all related expenses first
//         await Expense.deleteMany({ budgetId });

//         // ✅ Delete the budget
//         await Budget.findByIdAndDelete(budgetId);

//         return NextResponse.json({ message: "Budget and related expenses deleted successfully" });
//     } catch (error) {
//         return NextResponse.json({ error: "Error deleting budget" }, { status: 500 });
//     }
// // }

// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongodb";
// import Budget from "@/models/Budget";
// import Expense from "@/models/Expense";

// // ✅ GET Request: Fetch budgets with expenses for a user
// export async function GET(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get("userId");

//         if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

//         // ✅ Fetch budgets and include expenses
//         const budgets = await Budget.find({ userId }).lean();

//         for (let budget of budgets) {
//             const expenses = await Expense.find({ budgetId: budget._id });
//             budget.spent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
//             budget.expenses = expenses;
//         }

//         return NextResponse.json(budgets);
//     } catch (error) {
//         return NextResponse.json({ error: "Error fetching budgets" }, { status: 500 });
//     }
// }

// // ✅ POST Request: Add a new budget
// export async function POST(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { userId, name, amount } = await req.json();

//         if (!userId || !name || !amount) {
//             return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//         }

//         // ✅ Initialize spent as 0
//         const newBudget = await Budget.create({ userId, name, amount, spent: 0 });

//         return NextResponse.json(newBudget);
//     } catch (error) {
//         return NextResponse.json({ error: "Error creating budget" }, { status: 500 });
//     }
// }

// // ✅ PATCH Request: Update remaining budget
// export async function PATCH(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const budgetId = searchParams.get("budgetId");
//         const { remaining } = await req.json();

//         if (!budgetId || remaining === undefined) {
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         const updatedBudget = await Budget.findByIdAndUpdate(
//             budgetId,
//             { remaining },
//             { new: true }
//         );

//         if (!updatedBudget) {
//             return NextResponse.json({ error: "Budget not found" }, { status: 404 });
//         }

//         return NextResponse.json(updatedBudget);
//     } catch (error) {
//         return NextResponse.json({ error: "Error updating budget" }, { status: 500 });
//     }
// }

// // ✅ DELETE Request: Delete a budget and its expenses
// export async function DELETE(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const budgetId = searchParams.get("budgetId");

//         if (!budgetId) {
//             return NextResponse.json({ error: "Missing budgetId" }, { status: 400 });
//         }

//         // ✅ Delete all related expenses first
//         await Expense.deleteMany({ budgetId });

//         // ✅ Delete the budget
//         await Budget.findByIdAndDelete(budgetId);

//         return NextResponse.json({ message: "Budget and related expenses deleted successfully" });
//     } catch (error) {
//         return NextResponse.json({ error: "Error deleting budget" }, { status: 500 });
//     }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongodb";
// import Budget from "@/models/Budget";
// import Expense from "@/models/Expense";

// // ✅ GET Request: Fetch budgets with expenses for a user
// export async function GET(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get("userId");

//         if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

//         // ✅ Fetch budgets and include expenses
//         const budgets = await Budget.find({ userId }).lean();

//         for (let budget of budgets) {
//             const expenses = await Expense.find({ budgetId: budget._id });
//             budget.spent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
//             budget.expenses = expenses;
//         }

//         return NextResponse.json(budgets);
//     } catch (error) {
//         console.error("Error fetching budgets:", error);
//         return NextResponse.json({ error: "Error fetching budgets" }, { status: 500 });
//     }
// }

// // ✅ POST Request: Add a new budget
// export async function POST(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { userId, name, amount } = await req.json();

//         if (!userId || !name || !amount) {
//             return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//         }

//         // ✅ Initialize remaining as total amount
//         const newBudget = await Budget.create({ 
//             userId, 
//             name, 
//             amount, 
//             remaining: amount,
//             spent: 0 
//         });

//         return NextResponse.json(newBudget);
//     } catch (error) {
//         console.error("Error creating budget:", error);
//         return NextResponse.json({ error: "Error creating budget" }, { status: 500 });
//     }
// }

// // ✅ PATCH Request: Update remaining budget
// export async function PATCH(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const budgetId = searchParams.get("budgetId");
//         const { remaining } = await req.json();

//         console.log("Updating budget:", budgetId); // ✅ Debugging log
//         console.log("New remaining:", remaining);  // ✅ Debugging log

//         if (!budgetId || remaining === undefined) {
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         const updatedBudget = await Budget.findByIdAndUpdate(
//             budgetId,
//             { remaining },
//             { new: true }
//         );

//         if (!updatedBudget) {
//             return NextResponse.json({ error: "Budget not found" }, { status: 404 });
//         }

//         return NextResponse.json(updatedBudget);
//     } catch (error) {
//         console.error("Error updating budget:", error);
//         return NextResponse.json({ error: "Error updating budget" }, { status: 500 });
//     }
// }

// // ✅ DELETE Request: Delete a budget and its expenses
// export async function DELETE(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { searchParams } = new URL(req.url);
//         const budgetId = searchParams.get("budgetId");

//         if (!budgetId) {
//             return NextResponse.json({ error: "Missing budgetId" }, { status: 400 });
//         }

//         // ✅ Delete all related expenses first
//         await Expense.deleteMany({ budgetId });

//         // ✅ Delete the budget
//         await Budget.findByIdAndDelete(budgetId);

//         return NextResponse.json({ message: "Budget and related expenses deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting budget:", error);
//         return NextResponse.json({ error: "Error deleting budget" }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";

// ✅ GET Request: Fetch budgets with expenses for a user
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // ✅ Fetch budgets and precompute expenses
        const budgets = await Budget.find({ userId }).lean();
        const budgetIds = budgets.map(budget => budget._id);

        const expenses = await Expense.find({ budgetId: { $in: budgetIds } }).lean();

        // ✅ Group expenses by budgetId
        const expenseMap = new Map();
        for (const expense of expenses) {
            if (!expenseMap.has(expense.budgetId)) {
                expenseMap.set(expense.budgetId, []);
            }
            expenseMap.get(expense.budgetId).push(expense);
        }

        // ✅ Attach expenses and calculate spent amount
        for (const budget of budgets) {
            const relatedExpenses = expenseMap.get(budget._id) || [];
            budget.spent = relatedExpenses.reduce((sum: number, exp: { amount: number }) => sum + exp.amount, 0);
            budget.expenses = relatedExpenses;
        }

        return NextResponse.json(budgets);
    } catch (error) {
        console.error("Error fetching budgets:", error);
        return NextResponse.json({ error: "Error fetching budgets" }, { status: 500 });
    }
}

// ✅ POST Request: Add a new budget
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { userId, name, amount } = await req.json();

        if (!userId || !name || amount === undefined || typeof amount !== "number") {
            return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
        }

        const newBudget = await Budget.create({
            userId,
            name,
            amount,
            remaining: amount,
            spent: 0,
        });

        return NextResponse.json(newBudget);
    } catch (error) {
        console.error("Error creating budget:", error);
        return NextResponse.json({ error: "Error creating budget" }, { status: 500 });
    }
}

// ✅ PATCH Request: Update remaining budget
export async function PATCH(req: NextRequest) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const budgetId = searchParams.get("budgetId");
        const { remaining } = await req.json();

        if (!budgetId || remaining === undefined || typeof remaining !== "number") {
            return NextResponse.json({ error: "Invalid or missing required fields" }, { status: 400 });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(
            budgetId,
            { remaining },
            { new: true, lean: true }
        );

        if (!updatedBudget) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }

        return NextResponse.json(updatedBudget);
    } catch (error) {
        console.error("Error updating budget:", error);
        return NextResponse.json({ error: "Error updating budget" }, { status: 500 });
    }
}
export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        let budgetId = searchParams.get("budgetId");

        // Support both query params and path params
        if (!budgetId) {
            const urlParts = req.url.split("/");
            budgetId = urlParts[urlParts.length - 1]; // Extract last segment as ID
        }

        if (!budgetId) {
            return NextResponse.json({ error: "Missing budgetId" }, { status: 400 });
        }

        // ✅ Check if the budget exists before deleting
        const budgetExists = await Budget.findById(budgetId);
        if (!budgetExists) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }

        // ✅ Delete all related expenses first
        await Expense.deleteMany({ budgetId });

        // ✅ Delete the budget
        await Budget.findByIdAndDelete(budgetId);

        return NextResponse.json({ message: "Budget and related expenses deleted successfully" });
    } catch (error) {
        console.error("Error deleting budget:", error);
        return NextResponse.json({ error: "Error deleting budget" }, { status: 500 });
    }
}