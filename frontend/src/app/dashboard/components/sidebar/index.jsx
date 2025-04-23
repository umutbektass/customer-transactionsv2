'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import style from './styles.module.css'
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { usePathname } from 'next/navigation';


const Index = ({closeSidebar,isSidebarOpen}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isSidebarOpen) {
         if (window.innerWidth < 1024) {
          closeSidebar(false);
         }
    }
  }, [pathname]); 
  return (
    <div className={`${style.background} w-full h-full flex flex-col gap-5 text-white py-6 lg:py-12 `}>
      <button onClick={closeSidebar} className='block ms-auto pe-7 lg:hidden'><IoMdCloseCircleOutline size={30} color='white'/></button>
       <Link  className='flex flex-col justify-center items-center gap-2 text-md' href={'/dashboard'}>
         <TbTransactionDollar size={40} /> Gelir Gider Ekle
         </Link>
        <Link className='flex flex-col justify-center items-center gap-2 text-md' href={'/dashboard/add-customer'}>
        <FaUserAlt size={28} /> Müşteri Ekle
        </Link>
        <Link  className='flex flex-col justify-center items-center gap-2 text-md' href={'/dashboard/edit-customer'}>
         <MdOutlineEditNote size={40} /> Müşteri Düzenle
         </Link>
    </div>
  )
}

export default Index