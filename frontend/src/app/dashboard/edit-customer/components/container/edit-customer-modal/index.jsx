'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog"
import { Input } from "../../../../../../components/ui/input"
import { Button } from "../../../../../../components/ui/button"
import { toast } from "sonner"
import { getCustomerById, updateCustomer } from '../../../../../service/customerService'
import { useMutation } from '@tanstack/react-query'




const Modal = ({ open, close, customer, updateCustomerInState }) => {

  const [formData, setFormData] = useState({
    userId:'',
    name: '',
    phone: '',
    email: '',
    description: '',
  });


  const { mutate, isPending } = useMutation({
    mutationFn: getCustomerById,
    onSuccess: (data) => {
      setFormData({
        userId:data._id,
        name: data.name ,
        phone: data.phone ,
        email: data.email ,
        description: data.description ,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Bir hata oluştu.");
    },
  });

  const { mutateAsync: updateCustomerMutate } = useMutation({
    mutationFn: updateCustomer,
    onSuccess: (data) => {
      toast.success("Müşteri başarıyla güncellendi.");
    },
    onError: (error) => {
      toast.error(error.message || "Bir hata oluştu.");
    },
  });


  useEffect(() => {
    if (customer && open) {
      mutate(customer._id);
    }
  }, [customer, open, mutate]);


  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    if (!customer?._id) {
      toast.error("Müşteri ID bulunamadı.");
      return;
    }

    try {
      await updateCustomerMutate({ id: customer._id, data });
      updateCustomerInState(data)
      close()
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Müşteri Güncelle</DialogTitle>
          <DialogDescription>
            {isPending ? "Yükleniyor..." : "Müşteri bilgilerini düzenleyin."}
          </DialogDescription>
        </DialogHeader>

        {!isPending &&  (
          <form className='bg-white rounded-xl flex  flex-col  w-md gap-4 text-black   p-4' onSubmit={submit}>
            <h1 className='text-black text-xl '>Müşteri Ekle</h1>
            <Input  id='userId'
              name='userId'
              type='text'
              className={'hidden'}
              defaultValue={formData.userId}/>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='İsim Soyisim'
              defaultValue={formData.name}
            />

            <Input
              id='phone'
              name='phone'
              type='text'
              placeholder='Telefon Numarası'
              defaultValue={formData.phone}
            />

            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              defaultValue={formData.email}
            />

            <textarea
              className='rounded-md placeholder:text-gray-700 border-1 border-gray-200 text-gray-700 p-2'
              id='description'
              name='description'
              rows={7}
              placeholder='Açıklama'
              defaultValue={formData.description}
            />
            <Button className='text-black bg-white hover:text-white hover:bg-blue-700 bg-blue-700 text-white' type='submit'>Ekle</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
