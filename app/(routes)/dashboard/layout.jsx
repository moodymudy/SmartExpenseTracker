import React from 'react'
import SideNav from './_components/SideNav'
import DasboardHeader from './_components/DasboardHeader'

function DashboardLayout({children}) {
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <DasboardHeader/>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout