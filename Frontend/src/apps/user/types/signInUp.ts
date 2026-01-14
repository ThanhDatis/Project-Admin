import type { BaseAPIResponse } from '../../../shared/types/api';

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  agreeTerms: boolean;
}

/**
 * POST /api/Auth/register-customer
 */
export interface RegisterCustomerRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

/**
 * POST /api/Auth/Login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  refreshToken: string;
}

export type RegisterResponseData = string;

/**
 * User Profile từ API /api/Auth/me
 */
export interface UserProfile {
  userName: string;
  fullName: string;
  avatarUrl: string | null;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  address: string | null;
  gender: boolean | null; // true = male, false = female, null = not specified
}

export type LoginResponse = BaseAPIResponse<LoginResponseData>;

export type RegisterResponse = BaseAPIResponse<RegisterResponseData>;

export type UserProfileResponse = BaseAPIResponse<UserProfile>;

/**
 * Auth Tokens
 * Dùng để lưu trong store/localStorage
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser extends UserProfile {
  userId: string;
  role: 'Customer' | 'HotelOwner' | 'Staff' | 'Admin'; // Decoded từ JWT
}

export type SocialProvider = 'google' | 'facebook';

export interface SocialAuthPayload {
  provider: SocialProvider;
  token: string;
}

/**
 * Helper type để convert SignUpFormValues sang RegisterCustomerRequest
 */
export type SignUpToRegisterPayload = Omit<SignUpFormValues, 'confirmPassword' | 'agreeTerms'>;

/**
 * JWT Decoded Payload
 * Claims từ token backend
 */
export interface JWTPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  exp: number;
  iss: string;
  aud: string;
}
