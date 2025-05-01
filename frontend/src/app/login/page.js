import React from 'react';
import LoginForm from './components/login-form'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
export default async function LoginPage() {

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4"> 
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"> 
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Giriş Yap</h2> 
        <LoginForm/>
      </div>
    </div>
    );
  }
  else  redirect("/dashboard");
}


