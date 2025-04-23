'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog"
import { Button } from "../../../../../../components/ui/button"
import { toast } from "sonner"

import { useMutation } from '@tanstack/react-query'
import { deleteCustomer } from '../../../../../service/customerService'



const DeleteDialog = ({ open, close, customer,removeSelectedCustomer  }) => {
  const { mutateAsync: deleteCustomerMutate, isPending } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: (data) => toast(data.message),
    onError: (error) => toast(error.message),
  });

  const handleDelete = async () => {
    if (!customer?._id) return;
    try {
      await deleteCustomerMutate(customer._id);
      removeSelectedCustomer ()
      close()
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Müşteri Sil</DialogTitle>
          <DialogDescription>
            {isPending ? "Siliniyor..." : `${customer?.name} adlı müşteriyi silmek istediğinize emin misiniz?`}
          </DialogDescription>
        </DialogHeader>

        {!isPending && (
          <div className='flex justify-end gap-4 mt-4'>
            <Button onClick={close} variant="outline">Vazgeç</Button>
            <Button onClick={handleDelete} className='bg-red-600 hover:bg-red-700 text-white'>
              Sil
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
