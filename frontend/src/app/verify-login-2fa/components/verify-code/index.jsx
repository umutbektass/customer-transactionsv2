'use client'
import { verifyTwoLogin } from '../../../service/loginService';
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useMutation } from '@tanstack/react-query'; // useMutation importu
import style from './styles.module.css'

const Index = () => {
  const { data: session ,update} = useSession()
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('')
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: verifyTwoLogin,
    onSuccess: async (data) => {
      try {
        await update({
          accessToken: data.token,
          twoFactorEnabled: data.user.twoFactorEnabled,
        });
        router.push('/dashboard');
      } catch (updateError) {
        setError("Doğrulama sırasında hata oluştu.")
      }
    },
    onError: (error) => {
      setError(error.message)
    },
  });

  const submitCode = async (e) => {
      mutation.mutateAsync({
      method: 'email',
      userId: session.user.id,
      token: otp
    });
  }
  return (

    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4"> 
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"> 
      <div className='flex flex-col gap-5'>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700"> Mail Doğrulama kodunu giriniz.</h2> 
      <div className={style.codeInputContainer}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <button 
        disabled={otp.length < 6 || mutation.isPending} onClick={submitCode}
        type="button"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
       {mutation.isPending ? 'Kontrol Ediliyor...' : 'Onayla'}
      </button>
    
      <button type='button' className={"w-24 ms-auto"} onClick={()=>signOut({redirect: true, callbackUrl: "/login"})}>Çıkış Yap</button>
      {error}
    </div>
        </div>
        </div>
  
  )
}

export default Index