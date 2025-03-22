'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbconfig'
import { Expenses } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import ExpenseListTable from './_components/ExpenseListTable'

function Expense() {
  const [expensesList, setExpensesList] = useState([])

  useEffect(() => {
    const fetchExpenses = async () => {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Expenses)
        .orderBy(desc(Expenses.createdAt))
      setExpensesList(result)
    }

    fetchExpenses()
  }, [])

  return (
    <div className="p-5">
      <h2 className="font-sans text-3xl font-bold mb-3">Latest Expenses</h2>
      <ExpenseListTable expensesList={expensesList} />
    </div>
  )
}

export default Expense
