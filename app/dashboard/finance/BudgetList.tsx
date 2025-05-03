// "use client";
// import { useBudget } from "./BudgetContext";

// const BudgetList = () => {
//     const { budgets, expenses, deleteBudget } = useBudget();

//     return (
//         <div className="p-4">
//             {budgets.map((budget) => (
//                 <div key={budget.id} className="border p-4 mb-4 rounded-lg bg-white shadow-md flex justify-between items-center">
//                     <div>
//                         <h3 className="text-lg font-bold">
//                             {budget.name} - ${budget.remaining} / ${budget.amount}
//                         </h3>
//                         <ul className="mt-2">
//                             {expenses
//                                 ?.filter((exp) => exp.budgetId === budget.id)
//                                 .map((exp) => (
//                                     <li key={exp.id} className="text-sm">
//                                         {exp.name}: -${exp.amount}
//                                     </li>
//                                 ))}
//                         </ul>
//                     </div>
//                     <button
//                         onClick={() => {
//                             if (window.confirm("Are you sure you want to delete this budget?")) {
//                                 deleteBudget(budget.id);
//                             }
//                         }}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default BudgetList;

// "use client";
// import { useBudget } from "./BudgetContext";

// const BudgetList = () => {
//     const { budgets, expenses, deleteBudget } = useBudget();

//     return (
//         <div className="p-4">
//             {budgets.map((budget) => (
//                 <div key={budget._id} className="border p-4 mb-4 rounded-lg bg-white shadow-md flex justify-between items-center">
//                     <div>
//                         <h3 className="text-lg font-bold">
//                             {budget.name} - ${budget.spent} / ${budget.amount}
//                         </h3>
//                         <ul className="mt-2">
//                             {expenses
//                                 ?.filter((exp) => exp.budgetId === budget._id) // Use `_id`
//                                 .map((exp) => (
//                                     <li key={exp._id} className="text-sm">  {/* Use `_id` */}
//                                         {exp.name}: -${exp.amount}
//                                     </li>
//                                 ))}
//                         </ul>
//                     </div>
//                     <button
//                         onClick={() => {
//                             if (window.confirm("Are you sure you want to delete this budget?")) {
//                                 deleteBudget(budget._id); // Use `_id`
//                             }
//                         }}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default BudgetList;


"use client";
import { useBudget } from "./BudgetContext";

const BudgetList = () => {
    const { budgets, expenses, deleteBudget } = useBudget();

    return (
        <div className="p-4">
            {budgets.length > 0 ? (
                budgets.map((budget) => (
                    <div
                        key={budget._id}
                        className="border p-4 mb-4 rounded-lg bg-white shadow-md flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-bold">
                                {budget.name} - ${budget.spent} / ${budget.amount}
                            </h3>
                            {expenses.length > 0 && (
                                <ul className="mt-2">
                                    {expenses
                                        .filter((exp) => exp.budgetId === budget._id)
                                        .map((exp) => (
                                            <li key={exp._id} className="text-sm">
                                                {exp.name}: -${exp.amount}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this budget?")) {
                                    deleteBudget(budget._id);
                                }
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No budgets available. Add one!</p>
            )}
        </div>
    );
};

export default BudgetList;