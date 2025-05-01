"use client";
import React, { useState } from "react";
import Link from "next/link";
import EditDialog from "./components/edit-dialog/index";
import DeleteDialog from "./components/delete-dialog";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../service/customerService";
export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  const {
    data: customersData,
    isLoading: isLoadingCustomers,
    isFetching,
    error,
    isError: isCustomersError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-700">Müşteriler</h1>
        <Link href="/dashboard/customers/new">
          <span className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-pointer">
            + Yeni Müşteri
          </span>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal border-b border-gray-200">
                <th className="py-3 px-4 text-left">İsim</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Telefon</th>
                <th className="py-3 px-4 text-center">Kayıt Tarihi</th>
                <th className="py-3 px-4 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
             
              {Array.isArray(customersData) &&
                customersData?.map((customer) => {
                  const createdAt = new Date(
                    customer.createdAt
                  ).toLocaleDateString();
                  return (
                    <tr
                      key={customer._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <td className="py-4 px-4 text-left whitespace-nowrap">
                        <Link href={`/dashboard/customers/${customer._id}`}>
                          <span className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">
                            {customer.name}
                          </span>
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-left">
                        {customer.email || "-"}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {customer.phone || "-"}
                      </td>
                      <td className="py-4 px-4 text-center">{createdAt}</td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => openEditModal(customer)}
                          className="text-indigo-600 hover:text-indigo-800 cursor-pointer text-xs font-medium mr-2 focus:outline-none"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(customer)}
                          className="text-red-600 hover:text-red-800 cursor-pointer text-xs font-medium focus:outline-none"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  );
                })}
                 {isLoadingCustomers || isFetching && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 px-4 text-center text-gray-500"
                    >Kayıtlar yüklenir...</td>
                  </tr>
                )}
              {!isLoadingCustomers && customersData.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    Müşteri bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Customer Modal */}
      <EditDialog
        show={isEditModalOpen}
        onClose={closeModal}
        customer={selectedCustomer}
      />
      {/* Edit Customer Modal */}
      <DeleteDialog
        show={isDeleteModalOpen}
        onClose={closeModal}
        customer={selectedCustomer}
      />
      {isCustomersError}
    </div>
  );
}
