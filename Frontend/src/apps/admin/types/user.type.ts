import type { UserRole } from '../../../shared/config/constant';
import type { PaginatedResponse } from '../../../shared/types/api';
import type { BaseAPIResponse } from '../../../shared/types/api';

// ─── Entity ──────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  gender: boolean | null;
  hotelId: string | null;
  position: string | null;
  role: UserRole;
}

// ─── API params ───────────────────────────────────────────────────────────────

export interface GetUsersParams {
  PageNumber?: number;
  PageSize?: number;
  SearchTerm?: string;
  IsActive?: boolean;
  Gender?: boolean;
  Role?: UserRole;
  HotelId?: string;
}

// ─── API responses ────────────────────────────────────────────────────────────

export type UserListResponse = BaseAPIResponse<PaginatedResponse<AdminUser>>;

// ─── UI types ─────────────────────────────────────────────────────────────────

/** Tab tương ứng với role filter */
export type UserTab = 'Customer' | 'HotelOwner' | 'Receptionist' | 'Housekeeping';

export interface RoleStats {
  Customer: number;
  HotelOwner: number;
  Receptionist: number;
  Housekeeping: number;
}
