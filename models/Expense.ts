// import mongoose, { Schema, Document } from "mongoose";

// export interface IExpense extends Document {
//     userId: string;
//     budgetId: string;
//     name: string;
//     amount: number;
//     createdAt: Date;
// }

// const ExpenseSchema = new Schema<IExpense>({
//     userId: { type: String, required: true },
//     budgetId: { type: String, required: true },
//     name: { type: String, required: true },
//     amount: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
    userId: string;
    budgetId: string;
    name: string;
    amount: number;
}

const ExpenseSchema: Schema = new Schema({
    userId: { type: String, required: true },
    budgetId: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);