'use client'
import { summary } from '@/app/service/reportService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Index = ({date}) => {

    const { 
        data,         
        isLoading, 
        isFetching,
        error,         
        isError,    
        refetch
      } = useQuery({
        queryKey: ['summary'],
        queryFn: ()=>summary(date.startDate,date.endDate),
        staleTime:0,
        refetchOnWindowFocus:false
      });

      if(isLoading || isFetching){
        return (<div>Yükleiyor...</div>)
      }
      const {report : reportData} = data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
          {/* Styled summary boxes */}
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-700 font-medium mb-1">Toplam Gelen Para</p>
            <p className="text-2xl font-semibold text-emerald-800">₺{reportData?.totalIncoming}</p>
          </div>
          <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-medium mb-1">Toplam Giden Para</p>
            <p className="text-2xl font-semibold text-red-800">₺{reportData?.totalOutgoing}</p>
          </div>
          <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-700 font-medium mb-1">Net Kâr</p>
            <p className="text-2xl font-semibold text-indigo-800">₺{reportData?.netProfit}</p>
          </div>
        </div>
  )
}

export default Index