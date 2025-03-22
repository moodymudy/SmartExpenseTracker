"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Budgets } from '@/utils/schema'
import { toast } from 'sonner'
import { useUser } from "@clerk/nextjs";
import { db } from '@/utils/dbconfig'

  
function CreateBudget({refreshData}) {
    const [emojiIcon,setEmojiIcon]=useState('😂');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false)
    const [name,setName]=useState('');
    const [amount,setAmount] = useState('');
    const {user}=useUser();
    /**
     * Used to create new budget
     */
    const onCreateBudget=async()=>{
        const result=await db.insert(Budgets).values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress, 
            icon:emojiIcon
        }).returning({isertedId:Budgets.id})

        if (result)
        {
            refreshData()
            toast("New Budget Created!")
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                    </DialogHeader>
                    
                    <div className='mt-5'>
                        <Button variant='outline' className='text-lg' onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}>
                            {emojiIcon}
                        </Button>
                        <div className='absolute z-20'>
                            <EmojiPicker open={openEmojiPicker}
                                onEmojiClick={(e)=>{
                                    setEmojiIcon(e.emoji)
                                    setOpenEmojiPicker(false)
                                }}
                            />
                        </div> 
                        <div className='mt-3'>
                            <h2 className='text-black font-medium my-1'>Budget Name</h2>
                            <Input 
                                placeholder='e.g. Home Decor' 
                                className='mt-1'
                                value={name || ''}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-5'>
                            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                            <Input 
                                type='number' 
                                placeholder='e.g. 5000$' 
                                className='mt-1'
                                value={amount || ''}
                                onChange={(e)=>setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button 
                                disabled={!(name&&amount)}
                                onClick={()=>onCreateBudget()}
                                className='mt-5 w-full bg-blue-600'
                            >
                                Create Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget