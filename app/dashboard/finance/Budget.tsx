// "use client"; 
// import { useState } from "react";
// import { useBudget } from "./BudgetContext";

// const BudgetForm = () => {
//     const { addBudget } = useBudget();
//     const [name, setName] = useState("");
//     const [amount, setAmount] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!name || !amount) return;
//         addBudget(name, parseFloat(amount));
//         setName("");
//         setAmount("");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
//             <input 
//                 type="text" placeholder="Budget Name" value={name} 
//                 onChange={(e) => setName(e.target.value)} className="border p-2 w-full" 
//             />
//             <input 
//                 type="number" placeholder="Amount" value={amount} 
//                 onChange={(e) => setAmount(e.target.value)} className="border p-2 w-full mt-2" 
//             />
//             <button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full">Add Budget</button>
//         </form>
//     );
// };

// export default BudgetForm;
"use client";
import { useState, FormEvent } from "react";
import { useBudget } from "./BudgetContext";

const Budget = () => {
    const { addBudget } = useBudget();
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !amount.trim()) return;
        addBudget(name.trim(), parseFloat(amount) || 0);
        setName("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <input 
                type="text" 
                placeholder="Budget Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="border p-2 w-full rounded-md" 
                required
            />
            <input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="border p-2 w-full mt-2 rounded-md" 
                step="0.01"
                required
            />
            <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 mt-2 w-full rounded-md transition duration-300"
            >
                Add Budget
            </button>
        </form>
    );
};

export default Budget;