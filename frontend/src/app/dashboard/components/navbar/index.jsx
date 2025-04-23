'use client'
import React, { useEffect } from 'react'
import style from './styles.module.css'
import { Button } from "../../../../components/ui/button"
import { signOut } from 'next-auth/react';
import { RxHamburgerMenu } from "react-icons/rx";
const Index = ({openSidebar}) => {

  return (
    <div className={`${style.container} mb-7`}>
        <button className='block lg:hidden' onClick={openSidebar}><RxHamburgerMenu size={25} color='white'/></button>
        <Button onClick={signOut}  className={"bg-black border-none text-white text-right ms-auto hover:bg-black hover:text-white"} variant="outline">
          Çıkış Yap
          </Button>
    </div>
  )
}

export default Index