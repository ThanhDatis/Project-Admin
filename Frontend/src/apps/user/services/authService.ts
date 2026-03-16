import { axiosInstance } from '../../../shared/lib/axiosInstance';
import type { BaseAPIResponse } from '../../../shared/types/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterCustomerRequest,
  RegisterResponse,
  UserProfileResponse,
  AvatarUploadResponse,
  UpdateProfileRequest,
} from '../types';
import { tokenService } from '../utils/tokenService';

const AUTH_BASE_PATH = '/api/Auth';

export const authService = {
  /**
   * POST /api/Auth/register-customer
   */
  register: async (data: RegisterCustomerRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(
      `${AUTH_BASE_PATH}/register-customer`,
      data,
    );
    return response.data;
  },

  /**
   * POST /api/Auth/Login
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(`${AUTH_BASE_PATH}/Login`, data);

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
    const response = await axiosInstance.get<UserProfileResponse>(`${AUTH_BASE_PATH}/me`);
    return response.data;
  },

  /**
   * POST /api/Auth/Refreshtoken
   */
  refreshToken: async (token: string, refreshToken: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(`${AUTH_BASE_PATH}/Refreshtoken`, {
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
    const response = await axiosInstance.post<BaseAPIResponse>(
      `${AUTH_BASE_PATH}/send-confirmemail`,
    );
    return response.data;
  },

  /**
   * GET /api/Auth/email-confirmation
   */
  confirmEmail: async (userId: string, token: string): Promise<BaseAPIResponse> => {
    const response = await axiosInstance.get<BaseAPIResponse>(
      `${AUTH_BASE_PATH}/email-confirmation`,
      { params: { userId, token } },
    );
    return response.data;
  },

  /**
   * GET /api/Auth/google-login
   */
  getGoogleLoginUrl: (): string => {
    return `/api/Auth/google-login`;
  },

  /**
   * POST /api/Auth/forgot-password
   */
  forgotPassword: async (email: string, clientUrl: string): Promise<BaseAPIResponse> => {
    const response = await axiosInstance.post<BaseAPIResponse>(
      `${AUTH_BASE_PATH}/forgot-password`,
      { email, clientUrl },
    );
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
    const response = await axiosInstance.post<BaseAPIResponse>(`${AUTH_BASE_PATH}/resetpassword`, {
      password,
      confirmPassword,
      email,
      token,
    });
    return response.data;
  },

  /**
   * PUT /api/Auth/profile
   * Cập nhật: gender, address, phoneNumber (fullName & email không đổi qua endpoint này)
   */
  updateProfile: async (payload: UpdateProfileRequest): Promise<BaseAPIResponse> => {
    const response = await axiosInstance.put<BaseAPIResponse>(`${AUTH_BASE_PATH}/profile`, {
      userId: payload.userId,
      gender: payload.gender,
      address: payload.address,
      phoneNumber: payload.phoneNumber,
    });
    return response.data;
  },

  /**
   * POST /api/Auth/upload-avatar
   * Gửi file theo dạng multipart/form-data với key là "file" (IFormFile)
   * deleteOld=true sẽ xóa avatar cũ trên Cloudinary trước khi upload mới
   */
  uploadAvatar: async (file: File, deleteOld: boolean = true): Promise<AvatarUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file); // key 'file' khớp với IFormFile ở backend

    const response = await axiosInstance.post<AvatarUploadResponse>(
      `${AUTH_BASE_PATH}/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { deleteOld },
      },
    );
    return response.data;
  },

  /**
   * GET /api/Auth/{userId}
   */
  getUserById: async (userId: string): Promise<UserProfileResponse> => {
    const response = await axiosInstance.get<UserProfileResponse>(`${AUTH_BASE_PATH}/${userId}`);
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
    const response = await axiosInstance.get<BaseAPIResponse>(AUTH_BASE_PATH, { params });
    return response.data;
  },
};
