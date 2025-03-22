import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div key="budget-bar-chart-container" className='border rounded-lg p-5 shadow-md bg-white'>
      <h2 className='font-sans font-bold text-xl mb-4 text-gray-800'>Activity Dashboard</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          id="budget-bar-chart"
          data={budgetList}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20
          }}
          barSize={160}
          barGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey='name' 
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
          />
          <YAxis 
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '6px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '10px'
            }} 
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            iconType="circle"
          />
          <Bar 
            dataKey='totalSpend' 
            name='Total Spend' 
            stackId='a' 
            fill="#4299e1" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
          <Bar 
            dataKey='amount' 
            name='Amount' 
            stackId='a' 
            fill="#90cdf4" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard