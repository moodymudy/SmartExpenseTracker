"use client"; // Add this directive to mark the component as client-side

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Added missing import
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function SideNav() {
    const menuList = [
        { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
        { id: 2, name: 'Budget', icon: PiggyBank, path: '/dashboard/budgets' },
    ];

    const path = usePathname();  
    useEffect(() => {
        console.log(path);  
    }, [path]);  

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={'/logo.svg'} 
            alt='logo' 
            width={100} 
            height={160} 
            />
            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link 
                        href={menu.path} 
                        key={menu.id}
                        className={`flex gap-2 items-center text-gray-500 mb-2 font-medium p-5 cursor-pointer rounded-md hover:text-blue-500 hover:bg-blue-100 ${path === menu.path ? 'text-blue-500 bg-blue-100' : ''}`}
                    >
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-5 flex gap-2 items-center text-gray-500 font-medium cursor-pointer rounded-md hover:text-blue-500 hover:bg-blue-100'>
                <UserButton />
                <span>Profile</span>
            </div>
        </div>
    );
}

export default SideNav;