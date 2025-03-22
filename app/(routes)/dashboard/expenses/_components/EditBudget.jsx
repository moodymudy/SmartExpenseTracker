"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { db } from '@/utils/dbconfig'
import { Budgets } from '@/utils/schema'
function EditBudget({budgetInfo,refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || '😀');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false)
    const [name, setName] = useState(budgetInfo?.name || '');
    const [amount, setAmount] = useState(budgetInfo?.amount || 0);
    const {user}=useUser();
    useEffect(() => {
        if (budgetInfo && budgetInfo.icon) {
            setEmojiIcon(budgetInfo.icon);
        }
    }, [budgetInfo]);
    const onUpdateBudget=async()=>{
        const result=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();
        if (result)
        {
            refreshData()
            toast("Budget Updated!")
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                <Button className='flex gap-2'> <PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                    </DialogHeader>

                    <div className='mt-5'>
                        <Button variant='outline' className='text-lg' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                            {emojiIcon}
                        </Button>
                        <div className='absolute z-20'>
                            <EmojiPicker open={openEmojiPicker}
                                onEmojiClick={(e) => {
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
                                defaultValue={budgetInfo?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-5'>
                            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                            <Input
                                type='number'
                                placeholder='e.g. 5000$'
                                className='mt-1'
                                defaultValue={budgetInfo?.amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                onClick={() => onUpdateBudget()}
                                className='mt-5 w-full bg-blue-600'
                            >
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget