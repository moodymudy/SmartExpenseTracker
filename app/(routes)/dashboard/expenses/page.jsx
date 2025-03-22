'use client'
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbconfig';
import { desc, eq } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import ExpenseListTable from './_components/ExpenseListTable';

function ExpensesPage() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
          budgetName: Budgets.name,
          budgetId: Budgets.id
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.createdAt));
      
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-sans text-3xl font-bold">Your Expenses</h2>
          <p className='font-sans text-gray-500'>View and manage all your expense transactions</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading expenses...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          <ExpenseListTable 
            expensesList={expensesList} 
            refreshData={getAllExpenses}
            showBudgetName={true} // You might want to add this prop to your component
          />
        </div>
      )}
    </div>
  );
}

export default ExpensesPage;