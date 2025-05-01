'use client'
import apiClient from "../../lib/apiClient"; 


export const addTransaction = async (transactionData) => {
  try {
   
    const response = await apiClient.post('/api/transactions', transactionData);
    return response.data; // Başarılı yanıtı döndür
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Yeni işlem eklenirken bir API hatası oluştu.");
  }
};

export const getAllTransactions = async (startDate, endDate) => {
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

      const response = await apiClient.get(apiUrl);
      const apiData = response.data; 

      return apiData;

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
    return response.data;
  } catch (error) {
    console.error(`API Error in getTransactionsByCustomer (ID: ${customerId}):`, error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Müşteriye ait işlemler getirilirken bir API hatası oluştu.");
  }
};
