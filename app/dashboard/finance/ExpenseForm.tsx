"use client";
import { useState } from "react";
import { useBudget } from "./BudgetContext";

const ExpenseForm = () => {
    const { addExpense, budgets } = useBudget();
    const [budgetId, setBudgetId] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!budgetId || !name || !amount) return;

        addExpense(budgetId, name, parseFloat(amount));
        setName("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <select
                value={budgetId}
                onChange={(e) => setBudgetId(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="" disabled>Select Budget</option>
                {budgets.map((budget) => (
                    <option key={budget._id} value={budget._id}>
                        {budget.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Expense Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mt-2"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full mt-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full">
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;