'use client'; // Needed for state and event handlers

import React, { useState } from 'react';
import FilterPanel from './components/filter-panel'
import SummaryReport from './components/summary-report'
import Transactions from './components/all-transactions'
import TopCustomer from './components/top-customer'
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
// Placeholder data - replace with actual calculations based on fetched data
const reportData = {
  totalIncome: 4500.00,
  totalExpense: 250.00,
  netProfit: 4250.00,
  topCustomer: 'Ahmet Yılmaz', // Example
};

export default function ReportsPage() {
  const session = useSession()
  console.log(session)
  const queryClient = useQueryClient();

  const currentDate = new Date()
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getUTCDate() + 1).padStart(2, '0');
  const utcFormatted = `${year}-${month}-${day}`;


  const [date,setDate] = useState({
    startDate:'2025-01-25',
    endDate:utcFormatted
  })



  const handleGenerateReport = async () => {
    await Promise.all([
      queryClient.refetchQueries(['summary']),
      queryClient.refetchQueries(['getAllTransactions']),
      queryClient.refetchQueries(['top-customer'])

    ]);
  };
  
  const setDateValue = (state,value)=>{
    setDate((prev)=>({
      ...prev,[state]:value
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8"> 
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Raporlama Paneli</h1>
      </div>

      {/* Date Range Selection Card */}
      <FilterPanel date={date} setDateValue={setDateValue} handleGenerateReport={handleGenerateReport} />

      {/* Report Summary Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-5 text-gray-700">Özet Rapor</h2>
        {/* Responsive grid for summary stats */}
        <SummaryReport date={date}/>
        {/* Additional info section */}
        <Transactions date={date}/>
        <TopCustomer date={date}/>
      </div>
    </div>
  );
}
