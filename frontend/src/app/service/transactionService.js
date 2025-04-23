'use client'
import apiClient from "../../lib/apiClient"; 


export const addTransaction = async (transactionData) => {
  try {
   
    const response = await apiClient.post('/api/transactions', transactionData);
    console.log("Add Transaction API Response:", response.data);
    return response.data; // Başarılı yanıtı döndür
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Yeni işlem eklenirken bir API hatası oluştu.");
  }
};
// export const getAllTransactions = async () => {

//   try {
//     const response = await apiClient.get('/api/transactions');
//     return response.data;
//   } catch (error) {
//     console.error("API Error in getAllTransactions:", error);
//     if (error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     }
//     throw new Error(error.message || "Tüm işlemler getirilirken bir API hatası oluştu.");
//   }
// };
export const getAllTransactions = async (params = {}) => {
  const { startDate, endDate } = params;
  try {
      const queryParams = new URLSearchParams();
      if (startDate) {
          queryParams.append('startDate', startDate);
      }
      if (endDate) {
          queryParams.append('endDate', endDate);
      }
      const queryString = queryParams.toString();
      const apiUrl = `/api/transactions${queryString ? `?${queryString}` : ''}`;

      console.log("Servis Fonksiyonu - İstek URL:", apiUrl);
      const response = await apiClient.get(apiUrl);
      const apiData = response.data; 
      console.log("Servis Fonksiyonu - API Yanıtı:", apiData);

      let netBalance = 0;
      let totalIncome = 0;
      let totalExpense = 0;

      if (apiData && Array.isArray(apiData.transactions)) {
          apiData.transactions.forEach(tx => {
              const amount = Number(tx.amount) || 0;
              if (tx.type === 'gelen') {
                  totalIncome += amount;
              } else if (tx.type === 'giden') {
                  totalExpense += amount;
              }
          });
          netBalance = totalIncome - totalExpense;
      }

      return {
          ...apiData,
          netBalance,
          totalIncome,
          totalExpense
      };

  } catch (error) {
      console.error("Servis Fonksiyonu Hatası (getAllTransactions):", error);
      if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
      }
      const errorMessage = error.message || "İşlemler getirilirken bir servis hatası oluştu.";
      throw new Error(errorMessage);
  }
};
export const getTransactionsByCustomer = async (customerId) => {
  if (!customerId) {
      throw new Error("Müşteri ID'si gereklidir.");
  }
  try {
    const response = await apiClient.get(`/api/customers/${customerId}/transactions`); // Dinamik URL
    console.log(`Get Transactions for Customer ${customerId} API Response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`API Error in getTransactionsByCustomer (ID: ${customerId}):`, error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Müşteriye ait işlemler getirilirken bir API hatası oluştu.");
  }
};
