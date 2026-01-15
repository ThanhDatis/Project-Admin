export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  TIMEOUT: 30000,
} as const;

/**
 * Application Environment
 */
export const APP_CONFIG = {
  ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

/**
 * Feature Flags (Optional - for future use)
 */
export const FEATURE_FLAGS = {
  ENABLE_GOOGLE_AUTH: true,
  ENABLE_FACEBOOK_AUTH: false,
  ENABLE_REMEMBER_ME: true,
} as const;

export function getEnvVar(key: string, required: boolean = false): string | undefined {
  const value = import.meta.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function validateEnv(): void {}
