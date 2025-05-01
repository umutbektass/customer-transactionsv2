'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateCustomer } from '@/app/service/customerService';

const Index = ({ show, onClose, customer }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: updateCustomerMutate } = useMutation({
        mutationFn: updateCustomer,
        onSuccess: (data) => {
            toast.success("Müşteri başarıyla güncellendi.");
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
        onError: (error) => {
            toast.error(error.message || "Bir hata oluştu.");
        },
    });

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value.toString();
        });
        try {
            await updateCustomerMutate({ id: data._id, data });
            close()
        } catch (err) {
        }
        onClose();
    };

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" style={{ background: '#00000050' }} />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Müşteri Düzenle: {customer?.name}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                    <input
                                                type="text"
                                                id="_id"
                                                name="_id"
                                                defaultValue={customer?._id}
                                                className="hidden"
                                            />
                                               <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                defaultValue={customer?.name}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                defaultValue={customer?.email}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon:</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                defaultValue={customer?.phone}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                      
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama:</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                defaultValue={customer?.description}
                                                rows="3"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            ></textarea>
                                        </div>
                                        <div className="mt-4 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={onClose}
                                            >
                                                İptal
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                            >
                                                Kaydet
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Index