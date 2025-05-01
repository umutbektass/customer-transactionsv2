'use client'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const index = () => {
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const objData = Object.fromEntries(formData.entries());
    if(!objData.username || !objData.password) return   setError('E-posta ve Password Alanlarını doldurunuz!');
    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      username: objData.username,
      password: objData.password,
    });
    if (result?.error) {
      setError('E-posta veya şifre hatalı!');
      setLoading(false)
     return;
    } else if (result?.ok) {
        redirect('/verify-login-2fa')
    }
    setLoading(false)
  };
  return (
  <>
    <form onSubmit={handleSubmit}>
    <div className="mb-5"> 
      <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
        Email veya Kullanıcı Adı
      </label>
      <input
        type="text"
        id="username"
        name='username'
        className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
        placeholder="Email veya kullanıcı adınız"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2"> 
        Şifre
      </label>
      <input
        type="password"
        id="password"
        name='password'
        className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
        placeholder="••••••••" 
      />
    </div>
    <div className="flex items-center justify-between">
      <button 
        disabled={loading}
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
       {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </div>
  </form>
  <p className='text-red-700 text-xl'>{error}</p>
  </>
  )
}

export default index