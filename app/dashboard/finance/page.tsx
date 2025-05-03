import BudgetForm from "./Budget";
import ExpenseForm from "./ExpenseForm";
import BudgetList from "./BudgetList";
import { BudgetProvider } from "./BudgetContext";

const BudgetPage = () => {
    return (
        <BudgetProvider>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Budget Planner</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BudgetForm />
                    <ExpenseForm />
                </div>
                <BudgetList />
            </div>
        </BudgetProvider>
    );
};

export default BudgetPage;