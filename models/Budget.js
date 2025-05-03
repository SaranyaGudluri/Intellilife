import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    remaining: { type: Number, required: true },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }], 
});


export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
