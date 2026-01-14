/**
 * Generic Base API Response
 * @template T - Type của data field trong response
 */
export interface BaseAPIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors: string[];
  timestamp: string;
}

/**
 * API Error Response
 * Sử dụng khi success = false
 */
export interface APIErrorResponse {
  success: false;
  message: string;
  data?: null;
  errors: string[];
  timestamp: string;
}

/**
 * API Success Response
 * @template T - Type của data field
 */
export interface APISuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  errors: [];
  timestamp: string;
}

/**
 * Pagination Response Wrapper
 * Dùng cho các API trả về danh sách có phân trang
 */
export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * HTTP Error từ Axios
 */
export interface HTTPError {
  message: string;
  code?: string;
  status?: number;
  response?: {
    data?: APIErrorResponse;
    status: number;
    statusText: string;
  };
}
