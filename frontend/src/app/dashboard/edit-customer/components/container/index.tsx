'use client'
import {useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import EditDialog from './edit-customer-modal'
import DeleteDialog from './delete-customer-modal'
import { MdOutlineDelete } from "react-icons/md";
import {getAllCustomers} from '../../../../service/customerService'
import style from './styles.module.css'
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
const Container = () => {
  const [customers,setCustomers] = useState([])

  const { 
    data: customersData,         
    isLoading: isLoadingCustomers, 
    error: customersError,         
    isError: isCustomersError,    
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
    staleTime:0
  });

useEffect(() => {
    if (customersError) { 
        toast.error(customersError.message || "Müşteriler yüklenirken bir hata oluştu.");
    }
}, [customersError]); 

useEffect(() => {
  console.log("customersData",customersData)
  if (customersData) {
    setCustomers(customersData);
  }
}, [customersData]);

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)


  const handleEditClick = (customer) => {
    setSelectedCustomer(customer)
    setEditModalOpen(true)
  }
  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer)
    setDeleteModalOpen(true)
  }

  const removeSelectedCustomer  = ()=>{
    const newCustomers = customers.filter(customer=>customer._id!== selectedCustomer._id)
    setCustomers(newCustomers)
  }

  const updateCustomerInState = (updatedCustomer) => {
    const newCustomers = customers.map((c) =>
      c._id === updatedCustomer.userId ? updatedCustomer : c
    );
    setCustomers(newCustomers);
  };
  

  if (isLoadingCustomers) return <div>Yükleniyor...</div>

  return (
    <div className='overflow-x-auto'>
      <table className='w-3xl' id={style.table}>
  <thead className={`${style.tableHeader} text-white `}>
    <tr className='border-none text-white'>
      <th >İsim</th>
      <th >E-mail</th>
      <th >Telefon</th>
      <th>Eklenme Tarihi</th>
      <th >#</th>
    </tr>
  </thead>
  <tbody className={`text-white ${style.tableBody}`}>
    {
   customers.length>0 ?  
      customers.map((item, key) => {
        const createdAt = new Date(item.createdAt).toLocaleString().slice(0,16);
       return (
          <tr key={key} className='hover:bg-transparent'>
        <td className="font-medium">{item.name}</td>
        <td >{item.email}</td>
        <td>{item.phone}</td>
        <td>{createdAt}</td>
        <td className="flex gap-3 text-right">
        <button className='px-3 py-1 ' id={style.actionBtn}>
          <MdOutlineDelete onClick={()=>handleDeleteClick(item)} color='white' size={24}/></button>
              <button className='px-3 py-1' onClick={() => handleEditClick(item)} id={style.actionBtn}>
                <FaEdit color='white' size={20}/>
              </button>
        </td>
      </tr>
        )
      }) : (
        <tr >
        <td colSpan={5} className="font-medium">No customers found</td>
      </tr>
      )
    }
  </tbody>
</table>

      {selectedCustomer && (
       <>
        <EditDialog
          open={editModalOpen}
          close={() => setEditModalOpen(false)}
          customer={selectedCustomer}
          updateCustomerInState={updateCustomerInState}
        />
        <DeleteDialog
          open={deleteModalOpen}
          close={() => setDeleteModalOpen(false)}
          customer={selectedCustomer}
          removeSelectedCustomer ={removeSelectedCustomer }
        />
       </>
      )}
    </div>
  )
}

export default Container
