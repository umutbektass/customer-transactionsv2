import { getCustomerById } from '@/app/service/customerService';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

const Index = ({customerId}) => {
    const { 
        data: customer,         
        isLoading: isLoadingCustomers, 
        isFetching,
        error: customersError,         
        isError: isCustomersError,    
      } = useQuery({
        queryKey: ['customers'],
        queryFn: ()=>getCustomerById(customerId),
        enabled: !!customerId,
        staleTime:0,
        refetchOnWindowFocus:false
      });

      if(isLoadingCustomers || isFetching){
        return (<div>Yükleiyor...</div>)
      }
        if (!customer) {
          return (
            <div className="container mx-auto px-4 py-8 text-center"> {/* Consistent padding */}
              <p className="text-red-600 text-lg">Müşteri bulunamadı.</p> {/* Adjusted style */}
              <Link href="/dashboard/customers" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mt-4 transition duration-150 ease-in-out">
                <span>← Müşteri Listesine Dön</span>
              </Link>
            </div>
          );
        }
  return (
   <>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">{customer.name}</h1>
          <Link href="/dashboard/customers" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
            <span>← Müşteri Listesine Dön</span>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg"> 
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-700">Müşteri Bilgileri</h2> 
          
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <div><strong className="text-gray-500 font-medium block mb-1">Email:</strong> <span className="text-gray-800">{customer.email || '-'}</span></div>
            <div><strong className="text-gray-500 font-medium block mb-1">Telefon:</strong> <span className="text-gray-800">{customer.phone || '-'}</span></div>
            <div><strong className="text-gray-500 font-medium block mb-1">Kayıt Tarihi:</strong> <span className="text-gray-800">{new Date(customer.createdAt).toLocaleString()}</span></div>
            <div className="sm:col-span-2 lg:col-span-3"><strong className="text-gray-500 font-medium block mb-1">Açıklama:</strong> <span className="text-gray-800">{customer.description || '-'}</span></div>
          </div>
        </div>
            
        </>

  )
}

export default Index