// Budget.ts (Updated Schema for Budget Model)
import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
    userId: string;
    name: string;
    amount: number;
    spent: number;
    remaining: number;
}

const BudgetSchema: Schema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    remaining: { 
        type: Number, 
        default: function(this: any) { return this.amount; } 
    },    
}, { timestamps: true });

export default mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);