import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Index = () => {
    const { data } = useSession()
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
                <Link href="/">
                    <span className="text-lg font-semibold text-indigo-600 cursor-pointer">Yönetim Paneli</span>
                </Link>
                <div className='flex gap-4'>
                    {
                        data?.twoFactorEnabled && (
                            <>
                                <div className="hidden md:flex space-x-6 items-center">
                                    <Link href="/dashboard/customers">
                                        <span className="text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">Müşteriler</span>
                                    </Link>
                                    <Link href="/dashboard/reports">
                                        <span className="text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">Raporlar</span>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                    {
                        data?.twoFactorEnabled ? <button onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>
                            <span className="text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">Çıkış Yap</span>
                        </button> :
                            <Link href="/login">
                                <span className="text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out cursor-pointer">Giriş Yap</span>
                            </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Index