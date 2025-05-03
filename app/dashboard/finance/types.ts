// export type Budget = {
//     _id: string;
//     name: string;
//     amount: number;
//     remaining: number;
// };

// export type Expense = {
//     _id: string;
//     budgetId: string;
//     name: string;
//     amount: number;
// };

export type Expense = {
    _id: string;
    budgetId: string;
    name: string;
    amount: number;
};

export type Budget = {
    _id: string;
    name: string;
    amount: number;
    remaining: number;
    spent: number;
    expenses?: Expense[];
};