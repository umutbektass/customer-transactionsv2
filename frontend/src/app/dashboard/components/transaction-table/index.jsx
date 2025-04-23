'use client'
import React, { useEffect, useState } from 'react'
import style from './styles.module.css'
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import {getAllTransactions} from '../../../service/transactionService'
import { useSearchParams } from 'next/navigation'
const Container = () => {
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

    const {
        data, 
        isLoading, 
        error, 
    } = useQuery({
        queryKey: ['transactions', { startDate, endDate }],
        queryFn: () => getAllTransactions({ startDate, endDate }),
        staleTime:0
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "İşlemler yüklenirken bilinmeyen bir hata oluştu.");
        }
    }, [error]);

  return (
    <div className='mt-2 w-full lg:w-3xl overflow-x-auto '>
      <table className='w-full' id={style.table}>
  <thead className={`${style.tableHeader} text-white `}>
    <tr className='border-none text-white'>
      <th >Müşteri</th>
      <th >İşlem</th>
      <th >Tutar</th>
      <th>Açıklama</th>
      <th>Tarih</th>
    </tr>
  </thead>
  <tbody className={`text-white ${style.tableBody}`}>
    {
  data && data.transactions && data.transactions.length>0  ?  
      data.transactions.map((item, key) => {
        const createdAt = new Date(item.createdAt).toLocaleString().slice(0,16);
       return (
          <tr key={key} className='hover:bg-transparent'>
        <td className="font-medium">{item.customerId.name}</td>
        <td >{item.type}</td>
        <td>{item.amount}</td>
        <td>{item.description}</td>
        <td>{createdAt}</td>
      </tr>
        )
      }) : (
        <tr >
        <td colSpan={'5'} className="font-medium">No transactions found</td>
      </tr>
      )
    }
    {isLoading && (
      <tr>
        <td className='text-white' colSpan={5}>Yükleniyor...</td>
      </tr>
    )}
  </tbody>
</table>
<div className='text-white  text-right mt-1 flex justify-end items-center gap-3'>Net Kar : <p className='text-2xl'>{data?.netBalance}</p></div>
<hr className='mt-3'/>
    </div>
  )
}

export default Container
