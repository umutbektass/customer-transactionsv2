'use client'; // Needed for using params and potentially state later

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Placeholder function to get customer data - replace with actual data fetching
const getCustomerById = (id) => {
  // Simulate fetching data based on id
  const customers = [
    { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '555-1234', registered: '2025-04-20', description: 'Sadık müşteri.' },
    { id: '2', name: 'Ayşe Kaya', email: 'ayse@example.com', phone: '555-5678', registered: '2025-04-22', description: 'Potansiyel büyük proje.' },
  ];
  return customers.find(c => c.id === id);
};

// Placeholder data for transactions - replace later
const transactions = [
    { id: 't1', type: 'gelen', amount: 1500, date: '2025-04-25', description: 'Proje ön ödemesi' },
    { id: 't2', type: 'giden', amount: 250, date: '2025-04-26', description: 'Malzeme alımı' },
    { id: 't3', type: 'gelen', amount: 3000, date: '2025-04-28', description: 'Proje teslim ödemesi' },
];

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id;
  const customer = getCustomerById(customerId);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Prevent event from propagating to parent elements
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Implement actual delete logic here
    console.log(`Deleting customer with ID: ${customerId}`);
    setShowDeleteDialog(false);
    // TODO: Redirect to customer list page after deletion
  };

  const handleOpenTransactionDialog = () => {
    console.log('handleOpenTransactionDialog called'); // Debugging line
    setShowTransactionDialog(true);
  };

  const handleCloseTransactionDialog = () => {
    setShowTransactionDialog(false);
  };

  const handleSaveTransaction = () => {
    // TODO: Implement actual save transaction logic here
    console.log('Saving new transaction');
    handleCloseTransactionDialog();
  };

  if (!customer) {
    return (
      <div className="container mx-auto px-4 py-8 text-center"> {/* Consistent padding */}
        <p className="text-red-600 text-lg">Müşteri bulunamadı.</p> {/* Adjusted style */}
        <Link href="/customers" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mt-4 transition duration-150 ease-in-out">
          {/* <ArrowLeftIcon className="h-4 w-4 mr-1" /> Optional Icon */}
          <span>← Müşteri Listesine Dön</span>
        </Link>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="container mx-auto px-4 py-8 space-y-8"> {/* Consistent padding and add spacing between sections */}
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">{customer.name}</h1>
          <Link href="/customers" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
            {/* <ArrowLeftIcon className="h-4 w-4 mr-1" /> Optional Icon */}
            <span>← Müşteri Listesine Dön</span>
          </Link>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg"> {/* Consistent card style */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-700">Müşteri Bilgileri</h2> {/* Adjusted margin */}
            <button
              onClick={handleDeleteClick}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out text-sm"
            >
              Müşteriyi Sil
            </button>
          </div>
          {/* Improved grid layout for details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <div><strong className="text-gray-500 font-medium block mb-1">Email:</strong> <span className="text-gray-800">{customer.email || '-'}</span></div>
            <div><strong className="text-gray-500 font-medium block mb-1">Telefon:</strong> <span className="text-gray-800">{customer.phone || '-'}</span></div>
            <div><strong className="text-gray-500 font-medium block mb-1">Kayıt Tarihi:</strong> <span className="text-gray-800">{customer.registered}</span></div>
            <div className="sm:col-span-2 lg:col-span-3"><strong className="text-gray-500 font-medium block mb-1">Açıklama:</strong> <span className="text-gray-800">{customer.description || '-'}</span></div>
          </div>
          {/* TODO: Add Edit button later with proper styling */}
        </div>

        {/* Transactions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3">
              <h2 className="text-xl font-semibold text-gray-700">Para Hareketleri</h2>
              {/* TODO: Implement Add Transaction Modal/Page */}
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out text-sm">
                  + Yeni İşlem
              </button>
          </div>

          {/* Transaction Table Container */}
          <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
              <thead>
                  {/* Updated table header style */}
                  <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Tip</th>
                  <th className="py-3 px-4 text-right">Tutar (TL)</th>
                  <th className="py-3 px-4 text-center">Tarih</th>
                  <th className="py-3 px-4 text-left">Açıklama</th>
                  {/* <th className="py-3 px-4 text-center">İşlemler</th> */}
                  </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                  {transactions.map((tx) => (
                  // Updated table row style
                  <tr key={tx.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                      {/* Adjusted padding and styles */}
                      <td className={`py-4 px-4 text-left whitespace-nowrap font-medium ${tx.type === 'gelen' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.type === 'gelen' ? 'Gelen' : 'Giden'}
                      </td>
                      <td className={`py-4 px-4 text-right font-medium ${tx.type === 'gelen' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600">{tx.date}</td>
                      <td className="py-4 px-4 text-left text-gray-600">{tx.description}</td>
                      {/* <td className="py-4 px-4 text-center"> ... </td> */}
                  </tr>
                  ))}
                  {transactions.length === 0 && (
                  <tr>
                      <td colSpan="4" className="py-4 px-4 text-center text-gray-500">Bu müşteri için henüz işlem yok.</td>
                  </tr>
                  )}
              </tbody>
              </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Silme Onayı</h3>
            <p className="text-gray-600 mb-6">Bu müşteriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out text-sm"
              >
                İptal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out text-sm"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Transaction Dialog */}
      {showTransactionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Yeni İşlem Ekle</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">İşlem Tipi</label>
                <select
                  id="transactionType"
                  name="transactionType"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="gelen">Gelen</option>
                  <option value="giden">Giden</option>
                </select>
              </div>
              <div>
                <label htmlFor="transactionAmount" className="block text-sm font-medium text-gray-700">Tutar (TL)</label>
                <input
                  type="number"
                  name="transactionAmount"
                  id="transactionAmount"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-700">Tarih</label>
                <input
                  type="date"
                  name="transactionDate"
                  id="transactionDate"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="transactionDescription" className="block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                  id="transactionDescription"
                  name="transactionDescription"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseTransactionDialog}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out text-sm"
              >
                İptal
              </button>
              <button
                onClick={handleSaveTransaction}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out text-sm"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
