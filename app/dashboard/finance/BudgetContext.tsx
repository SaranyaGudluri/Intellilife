// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";

// interface Expense {
//     _id: string;
//     budgetId: string;
//     name: string;
//     amount: number;
// }

// interface Budget {
//     _id: string;
//     name: string;
//     amount: number;
//     remaining: number,
//     spent: number;
//     expenses: Expense[];
// }

// interface BudgetContextType {
//     budgets: Budget[];
//     expenses: Expense[];
//     addBudget: (name: string, amount: number) => void;
//     addExpense: (budgetId: string, name: string, amount: number) => void;
//     deleteBudget: (budgetId: string) => void;
// }

// const BudgetContext = createContext<BudgetContextType | null>(null);

// export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
//     const { user } = useUser();
//     const userId = user?.id;
//     const [budgets, setBudgets] = useState<Budget[]>([]);
//     const [expenses, setExpenses] = useState<Expense[]>([]);

//     // ✅ Fetch budgets & expenses with correct spent amount
//     useEffect(() => {
//         if (userId) {
//             axios.get(`/api/budgets?userId=${userId}`)
//                 .then(response => {
//                     const fetchedBudgets: Budget[] = response.data.map((budget: Budget) => {
//                         const totalSpent = expenses
//                             .filter((expense: Expense) => expense.budgetId === budget._id)
//                             .reduce((acc: number, exp: Expense) => acc + exp.amount, 0);
//                         return { ...budget, spent: totalSpent }; // Ensure spent amount persists
//                     });
//                     setBudgets(fetchedBudgets);
//                 })
//                 .catch(error => console.error("Error fetching budgets:", error));

//             axios.get(`/api/expenses?userId=${userId}`)
//                 .then(response => setExpenses(response.data))
//                 .catch(error => console.error("Error fetching expenses:", error));
//         }
//     }, [userId]);

//     // ✅ Add budget (Initial spent = 0)
//     const addBudget = async (name: string, amount: number) => {
//         if (!userId) return;
//         const newBudget = { userId, name, amount, spent: 0 };

//         try {
//             const response = await axios.post("/api/budgets", newBudget);
//             setBudgets([...budgets, response.data]);
//         } catch (error) {
//             console.error("Error adding budget:", error);
//         }
//     };

//     // ✅ Add expense & update spent amount correctly
//     const addExpense = async (budgetId: string, name: string, amount: number) => {
//         if (!userId) return;

//         try {
//             const newExpense = { userId, budgetId, name, amount };
//             const expenseResponse = await axios.post("/api/expenses", newExpense);
//             const addedExpense: Expense = expenseResponse.data;

//             // Update spent amount in state
//             const updatedBudgets = budgets.map((budget: Budget) => 
//                 budget._id === budgetId 
//                 ? { ...budget, spent: budget.spent + amount,
//                     remaining: budget.amount - (budget.spent + amount)
//                  }
//                 : budget
//             );

//             setExpenses(prevExpenses => [...prevExpenses, addedExpense]);
//             setBudgets(updatedBudgets);

//             // ✅ Persist spent amount in backend
//             // await axios.patch(`/api/budgets/${budgetId}`, { spent: updatedBudgets.find(b => b._id === budgetId)?.spent });
//             await axios.patch(`/api/budgets/${budgetId}`, { 
//                 spent: updatedBudgets.find(b => b._id === budgetId)?.spent,
//                 remaining: updatedBudgets.find(b => b._id === budgetId)?.remaining 
//             });
            

//         } catch (error) {
//             console.error("Error adding expense:", error);
//         }
//     };

//         // ✅ Function to delete a budget
//     const deleteBudget = async (budgetId: string) => { // ✅ Explicit type added
//         if (!budgetId) {
//             console.error("Error: budgetId is undefined");
//             return;
//         }

//         try {
//             const res = await fetch(`/api/budgets?budgetId=${budgetId}`, { method: "DELETE" });

//             if (res.ok) {
//                 setBudgets(prevBudgets => prevBudgets.filter(budget => budget._id !== budgetId));
//             } else {
//                 console.error("Failed to delete budget");
//             }
//         } catch (error) {
//             console.error("Error deleting budget", error);
//         }
//     };

//     return (
//         <BudgetContext.Provider value={{ budgets, expenses, addBudget, addExpense, deleteBudget }}>
//             {children}
//         </BudgetContext.Provider>
//     );
// };

// export const useBudget = () => {
//     const context = useContext(BudgetContext);
//     if (!context) {
//         throw new Error("useBudget must be used within a BudgetProvider");
//     }
//     return context;
// };

// BudgetContext.tsx (Updated Budget Context)
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface Expense {
    _id: string;
    budgetId: string;
    name: string;
    amount: number;
}

interface Budget {
    _id: string;
    name: string;
    amount: number;
    spent: number;
    remaining: number;
    expenses: Expense[];
}

interface BudgetContextType {
    budgets: Budget[];
    expenses: Expense[];
    addBudget: (name: string, amount: number) => void;
    addExpense: (budgetId: string, name: string, amount: number) => void;
    deleteBudget: (budgetId: string) => void;
}

const BudgetContext = createContext<BudgetContextType | null>(null);

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const userId = user?.id;
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (!userId) return;
        
        const fetchBudgetsAndExpenses = async () => {
            try {
                const [budgetRes, expenseRes] = await Promise.all([
                    axios.get(`/api/budgets?userId=${userId}`),
                    axios.get(`/api/expenses?userId=${userId}`)
                ]);
                
                setExpenses(expenseRes.data);
                
                const updatedBudgets = budgetRes.data.map((budget: Budget) => {
                    const totalSpent = expenseRes.data
                        .filter((exp: Expense) => exp.budgetId === budget._id)
                        .reduce((acc: number, exp: Expense) => acc + exp.amount, 0);
                    return { ...budget, spent: totalSpent, remaining: budget.amount - totalSpent };
                });
                
                setBudgets(updatedBudgets);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchBudgetsAndExpenses();
    }, [userId]);

    const addBudget = async (name: string, amount: number) => {
        if (!userId) return;
        
        try {
            const response = await axios.post("/api/budgets", { userId, name, amount, spent: 0, remaining: amount });
            setBudgets(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding budget:", error);
        }
    };

    const addExpense = async (budgetId: string, name: string, amount: number) => {
        if (!userId) return;
    
        try {
            console.log("Adding expense:", { budgetId, name, amount });
    
            const expenseRes = await axios.post("/api/expenses", { userId, budgetId, name, amount });
            const newExpense: Expense = expenseRes.data;
            
            setExpenses(prev => [...prev, newExpense]);
    
            setBudgets(prevBudgets => 
                prevBudgets.map(budget => {
                    if (budget._id === budgetId) {
                        const updatedSpent = budget.spent + amount;
                        const updatedRemaining = budget.amount - updatedSpent;
    
                        console.log("Updating budget:", budget._id);
                        console.log("Updated spent:", updatedSpent, "Updated remaining:", updatedRemaining);
    
                        return { ...budget, spent: updatedSpent, remaining: updatedRemaining };
                    }
                    return budget;
                })
            );
    
            await axios.patch(`/api/budgets?budgetId=${budgetId}`, {
                spent: newExpense.amount,
                remaining: budgets.find(b => b._id === budgetId)?.remaining ?? 0 - newExpense.amount
            });
    
            console.log("Expense added successfully");
    
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    // const deleteBudget = async (budgetId: string) => {
    //     if (!budgetId) return;
    //     try {
    //         const res = await axios.delete(`/api/budgets/${budgetId}`);
    //         if (res.status === 200) {
    //             setBudgets(prev => prev.filter(budget => budget._id !== budgetId));
    //             setExpenses(prev => prev.filter(expense => expense.budgetId !== budgetId));
    //         }
    //     } catch (error) {
    //         console.error("Error deleting budget:", error);
    //     }
    // };
    const deleteBudget = async (budgetId: string) => {
        try {
            const response = await axios.delete(`/api/budgets?budgetId=${budgetId}`);
            console.log("Budget deleted:", response.data);
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    };
    

    return (
        <BudgetContext.Provider value={{ budgets, expenses, addBudget, addExpense, deleteBudget }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) throw new Error("useBudget must be used within a BudgetProvider");
    return context;
};