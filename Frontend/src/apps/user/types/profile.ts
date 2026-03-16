import type { BaseAPIResponse } from '../../../shared/types/api';

/**
 * Response data từ POST /api/Auth/upload-avatar
 * File upload theo dạng multipart/form-data (IFormFile)
 */
export interface AvatarUploadData {
  publicId: string;
  url: string;
  thumbnailUrl: string;
  oldAvatarPublicId: string | null;
  oldAvatarDeleted: boolean;
  userId: string;
  uploadedAt: string;
  fileName: string;
  fileSize: number;
}

export type AvatarUploadResponse = BaseAPIResponse<AvatarUploadData>;

/**
 * Request body cho PUT /api/Auth/profile
 */
export interface UpdateProfileRequest {
  userId: string;
  gender: boolean;
  address: string;
  phoneNumber: string;
}

/**
 * Form values cho Personal Information form
 */
export interface ProfileFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: boolean | null;
  address: string;
}
