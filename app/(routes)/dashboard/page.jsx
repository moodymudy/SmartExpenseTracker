'use client'
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbconfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    if (!user) return;

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount}::NUMERIC)`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress ?? ''))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Budgets.id));
    setExpensesList(result);
  };

  return (
    <div className="p-5">
      <h2 className="font-sans text-3xl font-bold">Hi, {user?.fullName} ✌️</h2>
      <p className='font-sans text-gray-500'>Here's what's happening with your money, let's manage your expenses!</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList} />
          <div className='font-sans font-bold mt-3 mb-3 text-lg'>Latest Expenses</div>
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList()} />
        </div>
        <div className='flex flex-col gap-5 max-h-[calc(100vh-0px)] overflow-y-auto p-3 border rounded-lg bg-white shadow-md'>
          <div className='bg-white sticky '>
            <h2 className='font-sans font-bold text-lg'>Latest Budgets</h2>
          </div>
          <div className='overflow-y-auto'>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;