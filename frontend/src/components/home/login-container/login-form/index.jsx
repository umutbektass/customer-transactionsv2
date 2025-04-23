'use client'
import React, { useState } from 'react'
import { Input } from "../../../ui/input"
import { Button } from "../../../ui/button"
import style from './styles.module.css'
import { FaRegUser } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation'


const Index = () => {

  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const objData = Object.fromEntries(formData.entries());
    if(!objData.email || !objData.password) return   setError('E-posta ve Password Alanlarını doldurunuz!');
    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: objData.email,
      password: objData.password,
    });
    console.log("result",result)
    if (result?.error) {
      console.log("result",result)
      setError('E-posta veya şifre hatalı!');
      setLoading(false)
     return;
    } else if (result?.ok) {
        redirect('/verify-login-2fa')
    }
    setLoading(false)
  };


  return (
    <div className={`${style.container} h-screen flex flex-col justify-center items-center gap-3 `}>
       <form className='container w-full md:w-md mx-auto flex flex-col gap-3 items-center ' onSubmit={handleSubmit}> 
       <FaRegUser className='mb-5'  size={64} color='white' />
       <Input id="email" name="email"  type="text" placeholder="Email"       required
        className={`placeholder:text-white text-white ${style.input}`} />
       <Input  id="password" name="password" type="password" placeholder="Password"
         className={`placeholder:text-white text-white  ${style.input}`} />
       <Button disabled={loading}  type='submit' className='w-full' variant="outline">{loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</Button>
    </form>
    <p className='text-red-700 text-xl'>{error}</p>
    </div>
  )
}

export default Index