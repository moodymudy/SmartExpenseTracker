"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'; // Corrected import for Link
import { useRouter } from 'next/navigation'; // Updated import for useRouter

function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter(); // Use the useRouter from next/navigation

  // Redirect to Dashboard after sign-in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard'); // Redirect to the dashboard page
    }
  }, [isSignedIn, router]);

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image src={'./logo.svg'} alt='logo' width={100} height={80} />
      
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
