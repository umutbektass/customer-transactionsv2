'use client'
import { verifyTwoLogin } from '../../../../app/service/loginService';
import { Button } from '../../../ui/button';
import { signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
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
      console.log("Doğrulama başarılı:", data);
      try {
        await update({
          accessToken: data.token,
          twoFactorEnabled: data.user.twoFactorEnabled,
        });
        router.push('/dashboard');
      } catch (updateError) {
        console.log("updateError",updateError)
        setError("Doğrulama sırasında hata oluştu.")
      }
    },
    onError: (error) => {
      setError(error.message)
    },
  });

  const submitCode = async () => {
      mutation.mutateAsync({
      method: 'email',
      userId: session.user.id,
      token: otp
    });
  }
  return (
    <div className='flex flex-col gap-5'>
      <h3 className='text-white mb-5'> Mail Doğrulama kodunu giriniz.</h3>
      <div className={style.codeInputContainer}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <Button disabled={otp.length < 6 || mutation.isPending} onClick={submitCode} type='button' className='w-full' variant="outline">
        {mutation.isPending ? 'Kontrol Ediliyor...' : 'Onayla'}</Button>
      <Button className={"w-24 ms-auto"} onClick={signOut}>Çıkış Yap</Button>
      {error}
    </div>
  )
}

export default Index