import { topCustomer } from '@/app/service/reportService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import SimpleLineChart from '../simpleLine-chart';

const Index = ({date}) => {
    const { 
        data,         
        isLoading, 
        fetchStatus,
        error,         
        isError,    
      } = useQuery({
        queryKey: ['top-customer'],
        queryFn: ()=>topCustomer(date.startDate,date.endDate),
        staleTime:0,
        refetchOnWindowFocus: false,
      });
    
      if (isLoading || fetchStatus =='fetching') return <div>Yükleniyor...</div>
     const {report} = data;
  return (
    <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-600">
    <p><strong className="font-medium text-gray-700">En Çok İşlem Yapılan Müşteri: {report?.[0]?.name}</strong> </p>
    <p><strong className="font-medium text-gray-700">İşlem miktari: {report?.[0]?.totalAmount}</strong> </p>
    <SimpleLineChart data={report}/>
    {error}
 </div>
  )
}

export default Index