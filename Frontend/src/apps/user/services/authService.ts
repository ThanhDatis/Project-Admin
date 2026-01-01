import axios from 'axios';

import type { SignInFormValues, SignUpFormValues, AuthResponse } from '../types';

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  },
);

export const authService = {
  signIn: async (data: SignInFormValues): Promise<AuthResponse> => {
    const response = await authAPI.post<AuthResponse>('/signin', data);
    if (response.data.data?.token) {
      localStorage.setItem('accessToken', response.data.data.token);
    }
    return response.data;
  },

  signUp: async (data: SignUpFormValues): Promise<AuthResponse> => {
    const response = await authAPI.post<AuthResponse>('/signup', data);
    return response.data;
  },

  signOut: async (): Promise<void> => {
    await authAPI.post('/signout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  socialAuth: async (provider: 'google' | 'facebook', token: string): Promise<AuthResponse> => {
    const response = await authAPI.post<AuthResponse>(`/social/${provider}`, { token });
    if (response.data.data?.token) {
      localStorage.setItem('accessToken', response.data.data.token);
    }
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await authAPI.post('/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (
    token: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await authAPI.post('/reset-password', { token, newPassword });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await authAPI.get('/me');
    return response.data;
  },
};
