import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import VerifyCode from './components/verify-code'
import { redirect } from 'next/navigation'
const Page = async() => {
  const session = await getServerSession(authOptions)
  if(session?.twoFactorEnabled) {
    redirect('/dashboard')
  }
 else if(session?.user){
    return (
      <VerifyCode/>
       );
  }
  else {
    redirect('/')
  }
  

}

export default Page