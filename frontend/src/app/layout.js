'use client'
import Navbar from './components/navbar'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
     queries: {
       staleTime: 5 * 60 * 1000,
        retry: (failureCount, error) => {
          if (error?.response?.status === 401) {
            return false;
          }
          return failureCount < 3;
       }
     },
   },
 }));
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`} 
      >
         <SessionProvider>
         <QueryClientProvider client={queryClient}>
        <Navbar/>
        <main className="p-4">{children}</main> 
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
