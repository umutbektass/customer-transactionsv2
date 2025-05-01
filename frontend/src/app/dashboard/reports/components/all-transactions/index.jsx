'use client'
import { getAllTransactions } from '@/app/service/transactionService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Index = ({date}) => {
    const { 
        data,         
        isLoading, 
        fetchStatus,
        error,         
        isError,    
      } = useQuery({
        queryKey: ['getAllTransactions'],
        queryFn: ()=>getAllTransactions(date.startDate,date.endDate),
        staleTime:0,
        refetchOnWindowFocus: false,
      });
    
      if (isLoading || fetchStatus =='fetching') return <div>Yükleniyor...</div>
      const {transactions} = data;
  return (
    
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-12">
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal border-b border-gray-200">
            <th className="py-3 px-4 text-left">İsim</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Miktar</th>
            <th className="py-3 px-4 text-left">İşlem</th>
            <th className="py-3 px-4 text-left">Açıklama</th>
            <th className="py-3 px-4 text-center">Kayıt Tarihi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {Array.isArray(transactions) && transactions?.map((customer) => 
          {
            const createdAt = new Date(customer.createdAt).toLocaleDateString()
            return  (
              <tr key={customer._id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="py-4 px-4 text-left whitespace-nowrap">
                    <span className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">{customer?.customerId?.name ||'-'}</span>
                </td>
                <td className="py-4 px-4 text-left">{customer?.customerId?.email || '-'}</td>
                <td className="py-4 px-4 text-left">{customer?.amount || '-'}</td>
                <td className="py-4 px-4 text-left">{customer?.type || '-'}</td>
                <td className="py-4 px-4 text-left">{customer?.description || '-'}</td>
                <td className="py-4 px-4 text-center">{createdAt}</td>
             
              </tr>
            )
          }
         )}
          <tr>
            <td colSpan="6" className="p-5 text-right text-gray-500">Toplam kayıt : {data?.count}</td> 
          </tr>
        {transactions.length === 0 && (
          <tr>
            <td colSpan="5" className="py-4 px-4 text-center text-gray-500">Müşteri bulunamadı.</td> 
          </tr>
        )}
      </tbody>
    </table>
    </div> 
    {error}
  </div> 
  )
}

export default Index