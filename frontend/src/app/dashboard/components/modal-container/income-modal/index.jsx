'use client'
import React, { useEffect } from 'react'
import { Button } from "../../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"
import { Input } from "../../../../../components/ui/input"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {addTransaction} from '../../../../service/transactionService'
import { getAllCustomers } from '../../../../service/customerService'
import { toast } from 'sonner'
const Index = ({open,onOpenChange}) => {
  const queryClient = useQueryClient(); 
  // customers data
  const { data: customersData, isLoading: isLoadingCustomers, error: customersError } = useQuery({
      queryKey: ['customers'],
      queryFn: getAllCustomers,
      enabled: open, 
      staleTime: 5 * 60 * 1000, 
  });

   useEffect(() => {
      if (customersError) {
          toast.error(customersError.message || "Müşteriler yüklenirken bir hata oluştu.");
      }
   }, [customersError]);

    // gelen giden işlemi ekleme
  const { mutateAsync: addTransactionFnc, isPending: isAddingTransaction } = useMutation({
      mutationFn: addTransaction,
      onSuccess: (data) => {
          toast.success(data.message || 'İşlem başarıyla eklendi!');
          queryClient.invalidateQueries({ queryKey: ['transactions'] }); 
          queryClient.invalidateQueries({ queryKey: ['customers'] }); 
          onOpenChange();
      },
      onError: (error) => {
          toast.error(error.message || 'İşlem eklenirken bir hata oluştu.');
      },
  });

    
    const submit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const data = {}
      formData.forEach((value, key) => {
        data[key] = value.toString()
      })
      await addTransactionFnc(data)
      onOpenChange()
    }
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Gelen - Giden Para Ekle</DialogTitle>
        <DialogDescription>
         Müşteriler Gelen - Giden Para Ekle
        </DialogDescription>
      </DialogHeader>
      <form className='w-full flex flex-col gap-2' onSubmit={submit}>
        <label className='text-sm ps-2'>Müşteri : </label>
      <select name="customerId" id="customerId" className='border-1 border-gray-200 rounded-md p-2'>
          {customersData && customersData.map(customer=>(
            <option value={customer._id} key={customer._id}>{customer.name}</option>
          ))}
      </select>
      <label className='text-sm ps-2'>İşlem : </label>
      <select name="type" id="type" className='border-1 border-gray-200 rounded-md p-2'>
            <option value={"gelen"}>Gelen</option>
            <option value={"giden"}>Giden</option>
      </select>
      <label className='text-sm ps-2'>Tutar : </label>
      <Input name="amount" id="amount" placeholder='Tutar' type={'text'} required/>
      <label className='text-sm ps-2'>Açıklama : </label>
      <textarea name='description' id='description' rows={7} className='border-1 border-gray-200 rounded-md p-2' placeholder='Açıklama' required/>
      <Button type="submit">Kaydet</Button>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default Index