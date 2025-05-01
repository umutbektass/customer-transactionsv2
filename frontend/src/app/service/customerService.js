

'use client'
import apiClient from "../../lib/apiClient";

export const addCustomer = async (data) => {
    try {
      const response = await apiClient.post('/api/customers', data);
      return response.data; 
    } catch (error) {
      console.error("API Error in verifyTwoLogin:", error);
      if (error.response?.data?.message) {
         throw new Error(error.response.data.message);
      }
      throw new Error(error.message || "2FA doğrulama sırasında API hatası.");
    }
  };


export const getAllCustomers = async () => {
  try {
    const response = await apiClient.get('/api/customers/'); // Tip belirtmeden istek
    if (response.status && response.data) {
       return response.data.customers; 
    } else {
       throw new Error(response.data.message || 'Müşteriler getirilemedi.');
    }
  } catch (error) {
    console.error("API Error in getCustomers:", error);
    const message = error.response?.data?.message || error.message || "Müşterileri getirirken bir hata oluştu.";
    throw new Error(message);
  }
};


export const getCustomerById = async (id) => {
  try {
    const response = await apiClient.get(`/api/customers/${id}`); // Tip belirtmeden istek
    if (response.status && response.data) {
       return response.data.customer; 
    } else {
       throw new Error(response.data.message || 'Müşteriler getirilemedi.');
    }
  } catch (error) {
    console.error("API Error in getCustomers:", error);
    const message = error.response?.data?.message || error.message || "Müşterileri getirirken bir hata oluştu.";
    throw new Error(message);
  }
};


export const updateCustomer = async ({ id, data }) => {
    try {
        const response = await apiClient.put(`/api/customers/${id}`, data); // Tip belirtmeden istek
         if (!response.data.success) {
            throw new Error(response.data.message || 'Müşteri güncellenemedi.');
        }
        return response.data;
    } catch (error) {
        console.error("API Error in updateCustomer:", error);
        const message = error.response?.data?.message || error.message || "Müşteri güncellerken bir hata oluştu.";
        throw new Error(message);
    }
};


export const deleteCustomer = async (id) => {
     try {
        const response = await apiClient.delete(`/api/customers/${id}`); // Tip belirtmeden istek
         if (!response.data.success) {
            throw new Error(response.data.message || 'Müşteri silinemedi.');
        }
        return response.data;
    } catch (error) {
        console.error("API Error in deleteCustomer:", error);
        const message = error.response?.data?.message || error.message || "Müşteri silerken bir hata oluştu.";
        throw new Error(message);
    }
};