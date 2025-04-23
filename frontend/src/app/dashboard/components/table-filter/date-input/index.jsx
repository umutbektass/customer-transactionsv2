'use client'
import React, { useCallback, useState } from 'react'
import style from './styles.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
const index = ({id,labelText,query}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

    const defaultValue = searchParams.get(query.toString())

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const handleDateInput = (e)=>{
    const value = e.target.value;
    router.push(pathname + '?' + createQueryString(query, value))
  }
  return (
   <div className='flex flex-col gap-2 text-white w-[200px]'>
    <label htmlFor={id}>{labelText} : </label>
    <input defaultValue={defaultValue}  onChange={handleDateInput} id={id}   type='date' className={`${style.date} border-1 border-white rounded-md px-2 py-1 text-white`}/>
   </div>
  )
}

export default index