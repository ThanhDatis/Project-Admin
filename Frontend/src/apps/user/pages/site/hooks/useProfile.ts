import { useRef, useState } from 'react';

import ToastMessage from '../../../../../shared/components/toastMessage';
import { authService } from '../../../services';
import { useAuthStore } from '../../../store';
import { handleAPIError } from '../../../utils';
import type { ProfileFormValues } from '../../../types';

export const useProfile = () => {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Khởi tạo preview từ avatarUrl hiện tại trong store
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // ─────────────────────────────────────────────
  // AVATAR HANDLERS
  // ─────────────────────────────────────────────

  /**
   * Khi người dùng chọn file:
   * 1. Validate type & size
   * 2. Hiển thị preview local ngay lập tức (optimistic)
   * 3. Upload lên API → cập nhật store với URL Cloudinary trả về
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      ToastMessage('error', 'Chỉ chấp nhận file JPG, PNG hoặc WebP');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      ToastMessage('error', 'Kích thước file không được vượt quá 10MB');
      return;
    }

    // 1. Hiển thị preview local ngay (optimistic UI)
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // 2. Upload lên server
    try {
      setIsUploadingAvatar(true);

      const response = await authService.uploadAvatar(file, true);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Upload thất bại');
      }

      // 3. Cập nhật store với URL thật từ Cloudinary
      if (user) {
        setUser({ ...user, avatarUrl: response.data.url });
      }
      setAvatarPreview(response.data.url);

      ToastMessage('success', 'Cập nhật ảnh đại diện thành công!');
    } catch (error) {
      // Revert preview về ảnh cũ nếu upload thất bại
      setAvatarPreview(user?.avatarUrl ?? null);
      ToastMessage('error', handleAPIError(error));
    } finally {
      setIsUploadingAvatar(false);
      // Reset input để có thể chọn lại cùng file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Xóa preview avatar khỏi giao diện (local only)
   * Note: Chưa có endpoint DELETE avatar riêng trong API hiện tại
   */
  const handleDeleteAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ─────────────────────────────────────────────
  // PROFILE FORM HANDLER
  // ─────────────────────────────────────────────

  /**
   * Lưu thông tin cá nhân qua PUT /api/Auth/profile
   * userId lấy từ authStore (đã được decode từ JWT lúc đăng nhập)
   */
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

      // Sync store với dữ liệu mới từ form
      if (user) {
        setUser({
          ...user,
          phoneNumber: values.phoneNumber,
          address: values.address,
          gender: values.gender,
        });
      }

      ToastMessage('success', 'Cập nhật thông tin thành công!');
    } catch (error) {
      ToastMessage('error', handleAPIError(error));
    } finally {
      setIsSavingProfile(false);
    }
  };

  return {
    user,
    fileInputRef,
    avatarPreview,
    isUploadingAvatar,
    isSavingProfile,
    handleFileChange,
    handleDeleteAvatar,
    handleSaveProfile,
  };
};