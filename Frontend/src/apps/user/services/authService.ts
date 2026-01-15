import { createServiceInstance } from '../../../shared/lib/axiosInstance';
import type { BaseAPIResponse } from '../../../shared/types/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterCustomerRequest,
  RegisterResponse,
  UserProfileResponse,
} from '../types';
import { tokenService } from '../utils/tokenService';

const authAPI = createServiceInstance('/api/Auth');

export const authService = {
  /**
   * POST /api/Auth/register-customer
   */
  register: async (data: RegisterCustomerRequest): Promise<RegisterResponse> => {
    const response = await authAPI.post<RegisterResponse>('/register-customer', data);
    return response.data;
  },

  /**
   * POST /api/Auth/login
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await authAPI.post<LoginResponse>('/Login', data);

    if (response.data.success && response.data.data) {
      tokenService.saveTokens({
        accessToken: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
      });
    }

    return response.data;
  },

  /**
   * GET /api/Auth/me
   */
  getCurrentUser: async (): Promise<UserProfileResponse> => {
    const response = await authAPI.get<UserProfileResponse>('/me');
    return response.data;
  },

  /**
   * POST /api/Auth/Refreshtoken
   */
  refreshToken: async (token: string, refreshToken: string): Promise<LoginResponse> => {
    const response = await authAPI.post<LoginResponse>('/Refreshtoken', {
      token,
      refreshToken,
    });

    if (response.data.success && response.data.data) {
      tokenService.saveTokens({
        accessToken: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
      });
    }

    return response.data;
  },

  logout: (): void => {
    tokenService.clearTokens();
  },

  /**
   * POST /api/Auth/send-confirmemail
   */
  sendConfirmEmail: async (): Promise<BaseAPIResponse> => {
    const response = await authAPI.post<BaseAPIResponse>('/send-confirmemail');
    return response.data;
  },

  /**
   * GET /api/Auth/email-confirmation
   */
  confirmEmail: async (userId: string, token: string): Promise<BaseAPIResponse> => {
    const response = await authAPI.get<BaseAPIResponse>('/email-confirmation', {
      params: { userId, token },
    });
    return response.data;
  },

  /**
   * GET /api/Auth/google-login
   */
  getGoogleLoginUrl: (): string => {
    return `${API_BASE_URL}/api/Auth/google-login`;
  },

  /**
   * POST /api/Auth/forgot-password
   */
  forgotPassword: async (email: string, clientUrl: string): Promise<BaseAPIResponse> => {
    const response = await authAPI.post<BaseAPIResponse>('/forgot-password', {
      email,
      clientUrl,
    });
    return response.data;
  },

  /**
   * POST /api/Auth/resetpassword
   */
  resetPassword: async (
    password: string,
    confirmPassword: string,
    email: string,
    token: string,
  ): Promise<BaseAPIResponse> => {
    const response = await authAPI.post<BaseAPIResponse>('/resetpassword', {
      password,
      confirmPassword,
      email,
      token,
    });
    return response.data;
  },

  /**
   * PUT /api/Auth/profile
   */
  updateProfile: async (
    userId: string,
    gender: boolean,
    address: string,
    phoneNumber: string,
  ): Promise<BaseAPIResponse> => {
    const response = await authAPI.put<BaseAPIResponse>('/profile', {
      userId,
      gender,
      address,
      phoneNumber,
    });
    return response.data;
  },

  /**
   * POST /api/Auth/upload-avatar
   */
  uploadAvatar: async (file: File, deleteOld: boolean = true): Promise<BaseAPIResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await authAPI.post<BaseAPIResponse>('/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { deleteOld },
    });
    return response.data;
  },

  /**
   * GET /api/Auth/{userId}
   */
  getUserById: async (userId: string): Promise<UserProfileResponse> => {
    const response = await authAPI.get<UserProfileResponse>(`/${userId}`);
    return response.data;
  },

  /**
   * GET /api/Auth
   */
  getUsers: async (params?: {
    PageNumber?: number;
    PageSize?: number;
    SearchTerm?: string;
    IsActive?: boolean;
    Gender?: boolean;
    Role?: string;
    HotelId?: string;
  }): Promise<BaseAPIResponse> => {
    const response = await authAPI.get<BaseAPIResponse>('/', { params });
    return response.data;
  },
};

export { authAPI };
