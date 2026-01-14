import type { AxiosError } from 'axios';

import type { APIErrorResponse, HTTPError } from '../../../shared/types/api';

const DEFAULT_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet.',
  SERVER_ERROR: 'Có lỗi xảy ra từ máy chủ. Vui lòng thử lại sau.',
  UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  FORBIDDEN: 'Bạn không có quyền truy cập tài nguyên này.',
  NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu.',
  BAD_REQUEST: 'Dữ liệu gửi lên không hợp lệ.',
  TIMEOUT: 'Yêu cầu hết thời gian chờ. Vui lòng thử lại.',
  UNKNOWN: 'Có lỗi không xác định xảy ra. Vui lòng thử lại.',
} as const;

const ERROR_CODE_MAP: Record<number, string> = {
  400: DEFAULT_ERROR_MESSAGES.BAD_REQUEST,
  401: DEFAULT_ERROR_MESSAGES.UNAUTHORIZED,
  403: DEFAULT_ERROR_MESSAGES.FORBIDDEN,
  404: DEFAULT_ERROR_MESSAGES.NOT_FOUND,
  408: DEFAULT_ERROR_MESSAGES.TIMEOUT,
  500: DEFAULT_ERROR_MESSAGES.SERVER_ERROR,
  502: DEFAULT_ERROR_MESSAGES.SERVER_ERROR,
  503: DEFAULT_ERROR_MESSAGES.SERVER_ERROR,
  504: DEFAULT_ERROR_MESSAGES.TIMEOUT,
};

function isAxiosError(error: unknown): error is AxiosError<APIErrorResponse> {
  return (error as AxiosError).isAxiosError === true;
}

function parseAPIError(error: AxiosError<APIErrorResponse>): string {
  const response = error.response;

  if (!response) {
    return DEFAULT_ERROR_MESSAGES.NETWORK_ERROR;
  }

  const { data, status } = response;

  // Nếu backend trả về errors array và có items
  if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.join('\n');
  }

  if (data?.message) {
    return data.message;
  }

  return ERROR_CODE_MAP[status] || DEFAULT_ERROR_MESSAGES.UNKNOWN;
}

export function handleAPIError(error: unknown, customMessage?: string): string {
  // If custom message provided, use it
  if (customMessage) {
    return customMessage;
  }

  // Handle Axios errors
  if (isAxiosError(error)) {
    return parseAPIError(error);
  }

  // Handle Error objects
  if (error instanceof Error) {
    return error.message || DEFAULT_ERROR_MESSAGES.UNKNOWN;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  console.error('Unknown error type:', error);
  return DEFAULT_ERROR_MESSAGES.UNKNOWN;
}

export function getErrorStatusCode(error: unknown): number | undefined {
  if (isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
}

export function isAuthError(error: unknown): boolean {
  return getErrorStatusCode(error) === 401;
}

export function isForbiddenError(error: unknown): boolean {
  return getErrorStatusCode(error) === 403;
}

export function isNotFoundError(error: unknown): boolean {
  return getErrorStatusCode(error) === 404;
}

export function isServerError(error: unknown): boolean {
  const statusCode = getErrorStatusCode(error);
  return statusCode !== undefined && statusCode >= 500 && statusCode < 600;
}

export function isNetworkError(error: unknown): boolean {
  if (isAxiosError(error)) {
    return !error.response && error.code === 'ERR_NETWORK';
  }
  return false;
}

export function formatErrorForLogging(error: unknown): string {
  if (isAxiosError(error)) {
    return JSON.stringify(
      {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      },
      null,
      2,
    );
  }

  if (error instanceof Error) {
    return JSON.stringify(
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      null,
      2,
    );
  }

  return JSON.stringify(error, null, 2);
}

export function createHTTPError(error: unknown): HTTPError {
  if (isAxiosError(error)) {
    return {
      message: handleAPIError(error),
      code: error.code,
      status: error.response?.status,
      response: error.response
        ? {
            data: error.response.data,
            status: error.response.status,
            statusText: error.response.statusText,
          }
        : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    message: DEFAULT_ERROR_MESSAGES.UNKNOWN,
    code: 'UNKNOWN_ERROR',
  };
}

export function getErrorDetails(error: unknown): {
  message: string;
  statusCode?: number;
  errorType: string;
  isAuthError: boolean;
  isServerError: boolean;
  isNetworkError: boolean;
  rawError: unknown;
} {
  return {
    message: handleAPIError(error),
    statusCode: getErrorStatusCode(error),
    errorType: isAxiosError(error) ? 'axios' : error instanceof Error ? 'error' : 'unknown',
    isAuthError: isAuthError(error),
    isServerError: isServerError(error),
    isNetworkError: isNetworkError(error),
    rawError: error,
  };
}
