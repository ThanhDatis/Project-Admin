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
  agreeTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: UserProfile;
  };
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: 'user' | 'hotel_owner' | 'admin';
  createdAt: string;
}

// Social Auth
export type SocialProvider = 'google' | 'facebook';

export interface SocialAuthPayload {
  provider: SocialProvider;
  token: string;
}
