import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import VerifyCode from '../../components/home/login-container/verification-code'
import { redirect } from 'next/navigation'
const Page = async() => {
  const session = await getServerSession(authOptions)
  if(session?.twoFactorEnabled) {
    redirect('/dashboard')
  }
 else if(session?.user){
    return (
      <main className='flex justify-center items-center min-h-dvh'>
      <VerifyCode/>
      </main>
       );
  }
  else {
    redirect('/')
  }
  
 

}

export default Page