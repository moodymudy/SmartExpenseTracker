import { db } from '@/utils/dbconfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();
      
      if (result) {
        toast.success("Expense deleted successfully!");
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error(error);
    }
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Format amount to show currency symbol
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  return (
    <div className="overflow-x-auto rounded-lg border shadow">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {expensesList && expensesList.length > 0 ? (
            expensesList.map((expense, index) => (
              <tr key={expense.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {expense.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatAmount(expense.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatDate(expense.createdAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button
                    onClick={() => deleteExpense(expense)}
                    className="group inline-flex items-center rounded-md p-2 text-red-500 transition-all hover:bg-red-50"
                    aria-label={`Delete ${expense.name}`}
                  >
                    <Trash size={18} className="transition-all group-hover:scale-110" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={4} className="px-6 py-8 text-sm text-gray-500">
                {expensesList ? "No expenses found" : "Loading expenses..."}
              </td>
            </tr>
          )}
          
          {!expensesList && Array(3).fill(0).map((_, index) => (
            <tr key={`skeleton-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right">
                <div className="float-right h-8 w-8 animate-pulse rounded bg-gray-200"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseListTable