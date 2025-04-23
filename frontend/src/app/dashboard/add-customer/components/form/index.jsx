'use client'
import { Button } from '../../../../../components/ui/button'
import React, { useRef, useState } from 'react'
import { toast } from "sonner"
import Input from './input'
import { useMutation } from '@tanstack/react-query'
import { addCustomer } from '../../../../service/customerService'


const index = () => {
  const formRef = useRef(null);
  const mutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: async (data) => {
      try {
        toast(data.message)
        formRef.current.reset()
      } catch (updateError) {
        toast(updateError)
      }
    },
    onError: (error) => {
      toast(error.message)
    },
  });

  const submit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    mutation.mutateAsync(data);
  }
  return (
    <div className='flex   w-full h-full '>
      <form className='bg-white rounded-xl flex  flex-col  w-md gap-4 text-white   p-4' onSubmit={submit} ref={formRef}>
        <h1 className='text-black text-xl '>Müşteri Ekle</h1>
        <Input id='name' name='name' type='text' placeHolder='İsim Soyisim' />
        <Input  id='phone' name='phone' type='text' placeHolder='Telefon Numarası' />
        <Input id='email' name='email' type='email' placeHolder='Email' />
        <textarea className='rounded-md placeholder:text-gray-700 border-1 border-gray-700 text-gray-700 p-2' id='description' name='description' rows={7} placeholder='Açıklama' />
        <Button disabled={mutation.isPending} className='text-black bg-white hover:text-white hover:bg-blue-700 bg-blue-700 text-white' type='submit'>
          {mutation.isPending ? 'Ekleniyor...' : 'Ekle'}</Button>
      </form>
    </div>
  )
}

export default index