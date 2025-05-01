
"use client"

import apiClient from "../../lib/apiClient";

export const verifyTwoLogin = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/verify-login-2fa', data);
    return response.data; 
  } catch (error) {
    if (error.response?.data?.message) {
       throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "2FA doğrulama sırasında API hatası.");
  }
};


