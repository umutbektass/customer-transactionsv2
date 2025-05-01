'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addTransaction } from '@/app/service/transactionService';
import { Description, Field, Label, Select } from '@headlessui/react'
import clsx from 'clsx'

const Index = ({ show, onClose, customerId }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: updateTransactionMutate,isPending } = useMutation({
        mutationFn: addTransaction,
        onSuccess: (data) => {
            toast.success("Müşteri başarıyla güncellendi.");
            queryClient.invalidateQueries({ queryKey: ['getTransactionsByCustomer'] });
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
        data.customerId = customerId
        try {
            await updateTransactionMutate(data);
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
                                    Gelen - Giden Para Ekle
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">İşlem Türü:</label>
                                            <Select
                                            required
                                            id='type'
                                            name='type'
                                                className={clsx(
                                                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                )}
                                            >
                                                <option value="gelen">Gelen</option>
                                                <option value="giden">Giden</option>
                                            </Select>
                                           
                                        </div>
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Miktar:</label>
                                            <input
                                            required
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tarih:</label>
                                            <input
                                            required
                                                type='date'
                                                id="date"
                                                name="date"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama:</label>
                                            <textarea
                                                id="description"
                                                name="description"
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
                                            disabled={isPending}
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                            >
                                                {isPending ? 'Kaydediliyor...' : 'Kaydet'}
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