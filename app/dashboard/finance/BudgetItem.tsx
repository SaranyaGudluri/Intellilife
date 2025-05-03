// "use client";
// interface Expense {
//     _id: string;
//     name: string;
//     amount: number;
// }

// interface Budget {
//     _id: string;
//     name: string;
//     amount: number;
//     remaining: number;
//     expenses: Expense[];
// }

// const BudgetItem = ({ budget }: { budget: Budget }) => {
//     return (
//         <div className="border p-4 mb-4 rounded-lg bg-white shadow-md">
//             <h3 className="text-lg font-bold">
//                 {budget.name} - ${budget.remaining} / ${budget.amount}
//             </h3>
//             <ul className="mt-2">
//                 {budget.expenses.map((exp) => (
//                     <li key={exp._id} className="text-sm">
//                         {exp.name}: -${exp.amount}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BudgetItem;


"use client";
interface Expense {
    _id: string;
    name: string;
    amount: number;
}

interface Budget {
    _id: string;
    name: string;
    amount: number;
    remaining: number,
    spent: number; 
    expenses: Expense[];
}

const BudgetItem = ({ budget }: { budget: Budget }) => {
    return (
        <div className="border p-4 mb-4 rounded-lg bg-white shadow-md">
            <h3 className="text-lg font-bold">
                {budget.name} - ${budget.spent} / ${budget.amount}
            </h3>
            {budget.expenses.length > 0 && (
                <ul className="mt-2">
                    {budget.expenses.map((exp) => (
                        <li key={exp._id} className="text-sm">
                            {exp.name}: -${exp.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BudgetItem;