import { axiosInstance } from '../../../shared/lib/axiosInstance';
import type { GetUsersParams, UserListResponse } from '../types';

const AUTH_BASE_PATH = '/api/Auth';

export const userService = {
  /**
   * GET /api/Auth
   * Lấy danh sách user với filter, search và phân trang
   */
  getUsers: async (params?: GetUsersParams): Promise<UserListResponse> => {
    const response = await axiosInstance.get<UserListResponse>(AUTH_BASE_PATH, { params });
    return response.data;
  },
};
