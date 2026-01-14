import type { JWTPayload } from '../types';

const JWT_CLAIMS = {
  EMAIL: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  USER_ID: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  ROLE: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
} as const;

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  const pad = base64.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error('Invalid base64url string');
    }
    base64 += new Array(5 - pad).join('=');
  }

  try {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  } catch (error) {
    console.error('Base64Url decode error:', error);
    throw new Error('Failed to decode base64url string');
  }
}

export function decodeJWT(token: string): JWTPayload {
  try {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid JWT format: must have 3 parts');
    }

    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson) as JWTPayload;

    return payload;
  } catch (error) {
    console.error('JWT decode error:', error);
    throw new Error('Failed to decode JWT token');
  }
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const payload = decodeJWT(token);
    return payload[JWT_CLAIMS.USER_ID] || null;
  } catch (error) {
    console.error('Failed to extract user ID from token:', error);
    return null;
  }
}

export function getEmailFromToken(token: string): string | null {
  try {
    const payload = decodeJWT(token);
    return payload[JWT_CLAIMS.EMAIL] || null;
  } catch (error) {
    console.error('Failed to extract email from token:', error);
    return null;
  }
}

export function getRoleFromToken(token: string): string | null {
  try {
    const payload = decodeJWT(token);
    return payload[JWT_CLAIMS.ROLE] || null;
  } catch (error) {
    console.error('Failed to extract role from token:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJWT(token);

    if (!payload.exp) {
      return false;
    }

    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expirationTime;
  } catch (error) {
    console.error('Failed to check token expiration:', error);
    return true;
  }
}

export function getTokenExpirationDate(token: string): Date | null {
  try {
    const payload = decodeJWT(token);

    if (!payload.exp) {
      return null;
    }

    return new Date(payload.exp * 1000);
  } catch (error) {
    console.error('Failed to get token expiration date:', error);
    return null;
  }
}

export function getTimeUntilExpiration(token: string): number {
  try {
    const expirationDate = getTokenExpirationDate(token);

    if (!expirationDate) {
      return 0;
    }

    const timeUntilExpiration = expirationDate.getTime() - Date.now();
    return Math.max(0, timeUntilExpiration);
  } catch (error) {
    console.error('Failed to calculate time until expiration:', error);
    return 0;
  }
}

export function getUserInfoFromToken(token: string): {
  userId: string;
  email: string;
  role: string;
} | null {
  try {
    const payload = decodeJWT(token);

    const userId = payload[JWT_CLAIMS.USER_ID];
    const email = payload[JWT_CLAIMS.EMAIL];
    const role = payload[JWT_CLAIMS.ROLE];

    if (!userId || !email || !role) {
      console.warn('Token missing required claims');
      return null;
    }

    return {
      userId,
      email,
      role,
    };
  } catch (error) {
    console.error('Failed to extract user info from token:', error);
    return null;
  }
}

export function isValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  try {
    decodeJWT(token);
    return true;
  } catch {
    return false;
  }
}

export function shouldRefreshToken(token: string, minutesBeforeExpiry: number = 5): boolean {
  const timeUntilExpiration = getTimeUntilExpiration(token);
  const thresholdMs = minutesBeforeExpiry * 60 * 1000;

  return timeUntilExpiration < thresholdMs && timeUntilExpiration > 0;
}

export function getTokenDebugInfo(token: string): {
  userId: string | null;
  email: string | null;
  role: string | null;
  isExpired: boolean;
  expiresAt: string | null;
  timeUntilExpiry: string | null;
  isValid: boolean;
} {
  const isValid = isValidTokenFormat(token);

  if (!isValid) {
    return {
      userId: null,
      email: null,
      role: null,
      isExpired: true,
      expiresAt: null,
      timeUntilExpiry: null,
      isValid: false,
    };
  }

  const expirationDate = getTokenExpirationDate(token);
  const timeUntilExpiry = getTimeUntilExpiration(token);

  return {
    userId: getUserIdFromToken(token),
    email: getEmailFromToken(token),
    role: getRoleFromToken(token),
    isExpired: isTokenExpired(token),
    expiresAt: expirationDate ? expirationDate.toISOString() : null,
    timeUntilExpiry: timeUntilExpiry ? `${Math.floor(timeUntilExpiry / 1000 / 60)} minutes` : null,
    isValid: true,
  };
}
