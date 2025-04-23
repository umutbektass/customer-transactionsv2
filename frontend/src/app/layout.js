'use client'
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';



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
      <body>
        <SessionProvider>
        <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
