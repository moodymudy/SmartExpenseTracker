import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbconfig';
import { Expenses, Budgets } from '@/utils/schema';
import moment from 'moment/moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId, user, refreshData}) {
    // Initialize with empty strings to ensure they're always defined
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    
    const addNewExpense = async() => {
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('MM/DD/yyyy')
        }).returning({insertedId: Expenses.id});
        
        console.log(result);
        if(result) {
            // Clear form fields after successful submission
            setName('');
            setAmount('');
            
            refreshData();
            toast("New Expense Added");
        }
    }
    
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-3'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input 
                    placeholder='e.g. Bedroom Decor' 
                    className='mt-1'
                    value={name || ''} // Ensure value is never undefined
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className='mt-3'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input 
                    type='number' 
                    placeholder='e.g. $1000' 
                    className='mt-1'
                    value={amount || ''} // Ensure value is never undefined
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>
            <Button
                disabled={!(name && amount)}
                onClick={() => addNewExpense()}
                className='mt-5 w-full bg-blue-600'>Add Expense</Button>
        </div>
    )
}

export default AddExpense