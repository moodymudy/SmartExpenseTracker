"use client"
import { db } from '@/utils/dbconfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns, sql, desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from '../_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import { Pen, PenBox, Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'


function ExpensesScreen({ params }) {
  const resolvedParams = React.use(params);
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState();
  const route=useRouter();
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  /**
   * Get Budget Info
   */
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress ?? ''))
      .where(eq(Budgets.id, resolvedParams.id)) // Use resolvedParams.id instead of params.id
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
  };
  /**
   * Get Latest Info
   */
  const getExpensesList = async () => {
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, resolvedParams.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }
   /**
   * Used to Delete Budget
   */
   const deleteBudget = async () => {
    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId,resolvedParams.id))
    .returning()

    if(deleteExpenseResult){
      const result = await db.delete(Budgets)
      .where(eq(Budgets.id, resolvedParams.id))  
      .returning();
    }
    toast('Budget Deleted!')
    route.replace('/dashboard/budgets');
  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses
        <div className='flex gap-2 items-center'>
        <EditBudget budgetInfo={budgetInfo}
        refreshData={()=>getBudgetInfo()} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='flex gap-2 cursor-pointer' variant='destructive'> <Trash /> Delete</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your entire budget
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? <BudgetItem
          budget={budgetInfo} /> :
          <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
          </div>}
        <AddExpense
          budgetId={resolvedParams.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
          refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  );
}

export default ExpensesScreen;