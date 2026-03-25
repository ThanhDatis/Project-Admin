import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  // Radio,
  // RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  blue,
  cyan,
  gray,
  green,
  labelColor,
  primaryBackground,
  purple,
  red,
} from '../../../../shared/common/colors';

import { ProfileAvatarCard, ChangePassword } from './components/Profile';
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

const profileSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  address: Yup.string().max(255, 'Địa chỉ tối đa 255 ký tự'),
  gender: Yup.mixed<boolean | null>().nullable(),
});

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

            {/* Email confirmed */}
            {/* {user?.emailConfirmed && (
              <Chip
                label="Email Confirmed"
                size="small"
                sx={{
                  bgcolor: '#e3f2fd',
                  color: '#1565c0',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )} */}
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
      <Card
        sx={{
          borderRadius: 3,
          p: 3,
          boxShadow: 'none',
          border: `1px solid ${gray[300]}`,
        }}
      >
        <Typography variant="h1" sx={{ mb: 3, fontSize: 24 }}>
          Personal Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Full name — read-only (backend không có endpoint đổi tên) */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Full Name"
                value={formik.values.fullName}
                fullWidth
                disabled
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ '& .MuiInputBase-root': { bgcolor: '#fafafa' } }}
              />
            </Grid>

            {/* Email — read-only */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                value={formik.values.email}
                fullWidth
                disabled
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ '& .MuiInputBase-root': { bgcolor: '#fafafa' } }}
                helperText="Email cannot be changed"
              />
            </Grid>

            {/* Phone */}
            {/* <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                fullWidth
                size="small"
                placeholder="0xxxxxxxxx"
              />
            </Grid> */}

            {/* Address */}
            {/* <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
                size="small"
                placeholder="House number, street, district, city"
              />
            </Grid> */}

            {/* Gender */}
            {/* <Grid size={{ xs: 12 }}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#555', mb: 0.5 }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={
                    formik.values.gender === true
                      ? 'male'
                      : formik.values.gender === false
                        ? 'female'
                        : 'other'
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    formik.setFieldValue(
                      'gender',
                      val === 'male' ? true : val === 'female' ? false : null,
                    );
                  }}
                >
                  <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid> */}
          </Grid>

          {/* Submit */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={isSavingProfile ? undefined : <SaveRoundedIcon />}
              disabled={isSavingProfile || !formik.dirty}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                bgcolor: '#00ceb5',
                '&:hover': { bgcolor: '#00b8a2' },
                '&:disabled': { bgcolor: '#b2dfdb', color: '#fff' },
              }}
            >
              {isSavingProfile ? 'Save...' : 'Save Changes'}
            </Button>
          </Box>
        </form>
      </Card>

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
