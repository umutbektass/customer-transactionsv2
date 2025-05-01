import React, { useState } from 'react'
import AddTransactionsDialog from '../add-transactions-dialog'
import { useQuery } from '@tanstack/react-query';
import { getTransactionsByCustomer } from '@/app/service/transactionService';
const Index = ({ customerId }) => {
  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false)
  const openTransactionsModal = () => {
    setIsAddTransactionDialogOpen(true)
  };
  const onClose = () => setIsAddTransactionDialogOpen(false)


  const {
    data,
    isLoading: isLoadingTransactions,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ['getTransactionsByCustomer'],
    queryFn: () => getTransactionsByCustomer(customerId),
    enabled: !!customerId,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoadingTransactions || isFetching) {
    return (<div>Yükleniyor...</div>)
  }
  const { transactions } = data;
  const total = transactions.reduce((acc, tx) => {
    if (tx.type === 'gelen') {
      return acc + tx.amount;
    } else if (tx.type === 'giden') {
      return acc - tx.amount;
    }
    return acc;
  }, 0);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3">
        <h2 className="text-xl font-semibold text-gray-700">Para Hareketleri</h2>
        <button
          onClick={openTransactionsModal}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out text-sm">
          + Yeni İşlem
        </button>
        <AddTransactionsDialog show={isAddTransactionDialogOpen} onClose={onClose} customerId={customerId} />
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
              <tr key={tx._id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className={`py-4 px-4 text-left whitespace-nowrap font-medium ${tx.type === 'gelen' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.type === 'gelen' ? 'Gelen' : 'Giden'}
                </td>
                <td className={`py-4 px-4 text-right font-medium ${tx.type === 'gelen' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.amount.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center text-gray-600">{tx.date}</td>
                <td className="py-4 px-4 text-left text-gray-600">{tx.description}</td>
              </tr>
            ))}
            {(total > 0) && <tr className={`py-4 px-4 text-left whitespace-nowrap font-medium text-emerald-600 text-right`}>
              <td colSpan={4} className='p-4'>
               Toplam: {total}
              </td>
            </tr>}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">Bu müşteri için henüz işlem yok.</td>
              </tr>
            )}
          </tbody>
        </table>
        {error ||isError}
      </div>
    </>
  )
}

export default Index