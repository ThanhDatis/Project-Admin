import { useRef, useState } from 'react';

import { authService } from '../../apps/user/services';
import { useAuthStore } from '../../apps/user/store';
import type { ProfileFormValues } from '../../apps/user/types';
import { handleAPIError } from '../../apps/user/utils';
import ToastMessage from '../components/toastMessage';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_MB = 10;

/**
 * useProfileActions
 *
 * Shared hook — chứa toàn bộ business logic liên quan đến profile:
 *   - Upload avatar
 *   - Xoá avatar (local preview)
 *   - Lưu profile (gender, address, phoneNumber)
 *
 * Không biết gì về UI cụ thể của trang (User hay Admin).
 * Trang con import hook này và bổ sung logic UI riêng.
 */
export const useProfileActions = () => {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // ─── Avatar ────────────────────────────────────────────────────────────────

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      ToastMessage('error', 'Chỉ chấp nhận file JPG, PNG hoặc WebP');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      ToastMessage('error', `Kích thước file không được vượt quá ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    // Optimistic UI: hiển thị preview ngay lập tức
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    try {
      setIsUploadingAvatar(true);
      const response = await authService.uploadAvatar(file, true);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Upload thất bại');
      }

      // Cập nhật store với URL thật từ server (Cloudinary)
      if (user) {
        setUser({ ...user, avatarUrl: response.data.url });
      }
      setAvatarPreview(response.data.url);
      ToastMessage('success', 'Cập nhật ảnh đại diện thành công!');
    } catch (error) {
      // Rollback về avatar cũ nếu upload lỗi
      setAvatarPreview(user?.avatarUrl ?? null);
      ToastMessage('error', handleAPIError(error));
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // ─── Profile ───────────────────────────────────────────────────────────────

  const handleSaveProfile = async (values: ProfileFormValues) => {
    if (!user?.userId) {
      ToastMessage('error', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      setIsSavingProfile(true);

      const response = await authService.updateProfile({
        userId: user.userId,
        gender: values.gender ?? false,
        address: values.address,
        phoneNumber: values.phoneNumber,
      });

      if (!response.success) {
        throw new Error(response.message || 'Cập nhật thất bại');
      }

      setUser({
        ...user,
        phoneNumber: values.phoneNumber,
        address: values.address,
        gender: values.gender,
      });

      ToastMessage('success', 'Cập nhật thông tin thành công!');
    } catch (error) {
      ToastMessage('error', handleAPIError(error));
    } finally {
      setIsSavingProfile(false);
    }
  };

  return {
    // State
    user,
    fileInputRef,
    avatarPreview,
    isUploadingAvatar,
    isSavingProfile,
    // Actions
    handleFileChange,
    handleDeleteAvatar,
    handleSaveProfile,
    triggerFileInput,
  };
};
