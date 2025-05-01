

'use client'
import apiClient from "../../lib/apiClient";

export const summary = async (startDate,endDate) => {
  try {
    const response = await apiClient.get(`/api/reports/summary?startDate=${startDate}&endDate=${endDate}`); // Tip belirtmeden istek
    if (response.status && response.data) {
       return response.data; 
    } else {
       throw new Error(response.data.message || 'Müşteriler getirilemedi.');
    }
  } catch (error) {
    console.error("API Error in getCustomers:", error);
    const message = error.response?.data?.message || error.message || "Müşterileri getirirken bir hata oluştu.";
    throw new Error(message);
  }
};


export const topCustomer = async (startDate,endDate) => {
  try {
    const response = await apiClient.get(`/api/reports/top-customers?startDate=${startDate}&endDate=${endDate}`); // Tip belirtmeden istek
    if (response.status && response.data) {
       return response.data; 
    } else {
       throw new Error(response.data.message || 'Müşteriler getirilemedi.');
    }
  } catch (error) {
    console.error("API Error in getCustomers:", error);
    const message = error.response?.data?.message || error.message || "Müşterileri getirirken bir hata oluştu.";
    throw new Error(message);
  }
};

