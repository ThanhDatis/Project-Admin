import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { tokenService } from '../../apps/user/utils/tokenService';
import { API_CONFIG } from '../config/env';

const PUBLIC_ENDPOINTS = [
  '/Login',
  '/register-customer',
  '/forgot-password',
  '/resetpassword',
  '/google-login',
  '/email-confirmation',
] as const;

function isPublicEndpoint(url?: string): boolean {
  if (!url) return false;
  return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip adding token for public endpoints
    if (!isPublicEndpoint(config.url)) {
      const token = tokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('❌ [Request Error]', error);
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(
        `✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          data: response.data,
        },
      );
    }

    return response;
  },
  async (error) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error(`❌ [API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('🔒 [Auth] 401 Unauthorized - Clearing tokens');

      tokenService.clearTokens();

      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/signin')) {
        console.log('🔄 [Auth] Redirecting to login page');
        window.location.href = '/auth/signin';
      }
    }

    if (error.response?.status === 403) {
      console.warn('🚫 [Auth] 403 Forbidden - Access denied');
    }

    if (error.response?.status === 404) {
      console.warn('🔍 [API] 404 Not Found - Resource not found');
    }

    if (error.response?.status >= 500) {
      console.error('💥 [API] Server Error');
    }

    return Promise.reject(error);
  },
);

export function createServiceInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL: `${API_CONFIG.BASE_URL}${baseURL}`,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Copy interceptors from main instance
  instance.interceptors.request = axiosInstance.interceptors.request;
  instance.interceptors.response = axiosInstance.interceptors.response;

  return instance;
}

export default axiosInstance;
