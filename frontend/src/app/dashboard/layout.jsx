'use client'
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { setAuthToken } from '@/lib/apiClient';
import { redirect, useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { ClockLoader } from 'react-spinners';

<ToastContainer />
const Layout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter()
    useEffect(() => {
        if (session?.accessToken) {
            setAuthToken(session.accessToken);
        }
    }, [session]);

    if (status === "loading") {
        return (
            <div className='flex items-center justify-center min-h-[50vh]'>
                <ClockLoader />
            </div>
        )
    }

    if (!session?.twoFactorEnabled) {
        router.push('/login')
    }
    else {
        return (
            <div>{children}
                <ToastContainer />
            </div>
        )
    }
}

export default Layout