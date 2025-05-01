'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { addCustomer } from '@/app/service/customerService';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';


export default function NewCustomerPage() {
  const formRef = useRef(null);
  const rouuter = useRouter()
  const mutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: async (data) => {
      try {
        toast.success(data.message)
        formRef.current.reset()
        rouuter.push('/dashboard')
      } catch (updateError) {
        toast(updateError)
      }
    },
    onError: (error) => {
      toast(error.message)
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    mutation.mutateAsync(data);
  }
  return (
    <div className="container mx-auto px-4 py-8"> 
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Yeni Müşteri Ekle</h1>
        <Link href="/customers" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
          <span>← Müşteri Listesine Dön</span>
        </Link>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl mx-auto"> 
        <form onSubmit={handleSubmit} className="space-y-5" ref={formRef}>
          <div> 
            <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-1"> 
              İsim Soyisim <span className="text-red-500">*</span> 
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Müşterinin adı ve soyadı"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-600 text-sm font-medium mb-1">
              Telefon Numarası
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Örn: 555 123 4567"
              required

            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">
              Email Adresi
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="musteri@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600 text-sm font-medium mb-1">
              Açıklama / Notlar
            </label>
            <textarea
              id="description"
              name="description"
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out h-24"
              placeholder="Müşteri hakkında ek bilgiler..."
            />
          </div>
          <div className="flex items-center justify-end pt-2"> 
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
            >
              Müşteriyi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
