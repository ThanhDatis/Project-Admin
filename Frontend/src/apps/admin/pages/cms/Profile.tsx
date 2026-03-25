import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box, Button, Card, Chip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  blue,
  cyan,
  green,
  labelColor,
  primaryBackground,
  purple,
  red,
} from '../../../../shared/common/colors';

import { ProfileAvatarCard, ChangePassword } from './components/Profile';
import ProfileInfoForm from './components/Profile/ProfileInfoForm';
import { useAdminProfile } from './hooks/useAdminProfile';

// ─── Role badge config ────────────────────────────────────────────────────

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  SysAdmin: { label: 'System Admin', color: red[900], bg: '#ffebee' },
  HotelOwner: { label: 'Hotel Owner', color: red[700], bg: '#fff3e0' },
  Receptionist: { label: 'Receptionist', color: blue[700], bg: '#e3f2fd' },
  Housekeeping: { label: 'Housekeeping', color: green[700], bg: '#e8f5e9' },
  Customer: { label: 'Customer', color: purple[700], bg: '#f3e5f5' },
};

// ─── Validation ──────────────────────────────────────────────────────────

// const profileSchema = Yup.object({
//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ')
//     .required('Vui lòng nhập số điện thoại'),
//   address: Yup.string().max(255, 'Địa chỉ tối đa 255 ký tự'),
//   gender: Yup.mixed<boolean>().nullable(),
// });

// ────────────────────────────────────────────────────────────────────────────

function AdminProfile() {
  const {
    user,
    fileInputRef,
    avatarPreview,
    isUploadingAvatar,
    isSavingProfile,
    handleFileChange,
    triggerFileInput,
    handleSaveProfile,
    isPasswordDialogOpen,
    isChangingPassword,
    openPasswordDialog,
    closePasswordDialog,
    handleChangePassword,
    handleLogout,
    initialValues,
  } = useAdminProfile();

  const roleConfig = ROLE_CONFIG[user?.role ?? ''] ?? {
    label: user?.role ?? 'Unknown',
    color: '#616161',
    bg: '#f5f5f5',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: handleSaveProfile,
  });

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* ── Header card: Avatar + tên + role + status ── */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, #f8fffe 0%, #f0faf8 100%)',
          border: '1px solid #d0f0eb',
          boxShadow: 'none',
        }}
      >
        <ProfileAvatarCard
          avatarPreview={avatarPreview}
          displayName={user?.fullName || 'U'}
          isUploading={isUploadingAvatar}
          onTriggerUpload={triggerFileInput}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
            {user?.fullName || '—'}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1.5, color: labelColor }}>
            {user?.email}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Role badge */}
            <Chip
              label={roleConfig.label}
              size="small"
              sx={{
                bgcolor: roleConfig.bg,
                color: roleConfig.color,
                fontWeight: 700,
                height: 24,
                border: `1px solid ${roleConfig.color}30`,
              }}
            />

            {/* Status badge */}
            <Chip
              label="Active"
              size="small"
              sx={{
                // bgcolor: '#e8f5e9',
                color: green[700],
                fontWeight: 600,
                p: '0 8px',
                height: 24,
                '&::before': {
                  content: '"●"',
                  fontSize: 12,
                },
              }}
            />
          </Box>
        </Box>

        {/* Quick actions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 160 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<KeyRoundedIcon />}
            onClick={openPasswordDialog}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              borderColor: cyan[500],
              color: cyan[500],
              '&:hover': { borderColor: cyan[600], bgcolor: primaryBackground },
            }}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            color="error"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Logout
          </Button>
        </Box>
      </Card>

      {/* ── Edit form ── */}
      <ProfileInfoForm formik={formik} isSaving={isSavingProfile} />

      {/* ── Change Password Dialog ── */}
      <ChangePassword
        open={isPasswordDialogOpen}
        email={user?.email ?? ''}
        isLoading={isChangingPassword}
        onClose={closePasswordDialog}
        onConfirm={handleChangePassword}
      />
    </Box>
  );
}

export default AdminProfile;
