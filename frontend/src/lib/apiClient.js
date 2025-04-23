'use client'
import axios from 'axios';
import {  signOut} from 'next-auth/react';


let authToken = null;
export const setAuthToken = (token) => {
  authToken = token;
};

const apiClient = axios.create({
  baseURL: process.env.API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error("Unauthorized request - Signing out...");
          signOut();
       
      }
      // console.error(`API Error: ${status}`, error.response.data);
      return Promise.reject(error.response.data || 'Beklenmeyen bir hata oluştu.');
    } else if (error.request) {
      console.error('Network Error or No Response:', error.message);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;