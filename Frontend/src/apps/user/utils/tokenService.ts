import type { AuthTokens } from '../types';

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

/**
 * Token Service Class
 */
class TokenService {
  saveAccessToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Failed to save access token:', error);
    }
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  removeAccessToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  }

  saveRefreshToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Failed to save refresh token:', error);
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  }

  removeRefreshToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Failed to remove refresh token:', error);
    }
  }

  saveTokens(tokens: AuthTokens): void {
    this.saveAccessToken(tokens.accessToken);
    this.saveRefreshToken(tokens.refreshToken);
  }

  getTokens(): AuthTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  hasTokens(): boolean {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  }

  hasAccessToken(): boolean {
    return Boolean(this.getAccessToken());
  }

  hasRefreshToken(): boolean {
    return Boolean(this.getRefreshToken());
  }

  updateAccessToken(token: string): void {
    this.saveAccessToken(token);
  }
}

export const tokenService = new TokenService();

export default TokenService;
