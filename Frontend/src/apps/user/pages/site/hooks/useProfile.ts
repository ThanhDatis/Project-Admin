import { useRef, useState } from 'react';

import ToastMessage from '../../../../../shared/components/toastMessage';
import { authService } from '../../../services';
import { useAuthStore } from '../../../store';
import type { ProfileFormValues } from '../../../types';
import { handleAPIError } from '../../../utils';

export const useProfile = () => {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

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
      setAvatarPreview(user?.avatarUrl ?? null);
      ToastMessage('error', handleAPIError(error));
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
