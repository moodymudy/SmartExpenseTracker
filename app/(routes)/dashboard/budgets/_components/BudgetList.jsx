'use client'
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbconfig'
import BudgetItem from '../../_components/BudgetItem'

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser(); // ✅ Fix: Call the hook correctly

  useEffect(() => {
    if (user) getBudgetList(); // ✅ Fix: Ensure user is available before calling
  }, [user]);

  /**
   * Used to get the budget list
   */
  const getBudgetList = async () => {
    if (!user) return; // ✅ Fix: Prevent errors if user is undefined

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount}::NUMERIC)`.mapWith(Number), // ✅ Fix: Explicit type casting
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress ?? '')) // ✅ Fix: Prevent undefined error
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget 
        refreshData={()=> getBudgetList()}/>
        {budgetList?.length>0? budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))
      :[1,2,3,4,5].map((item,index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

        </div>

  
      ))}
      </div>
    </div>
  );
}

export default BudgetList;
