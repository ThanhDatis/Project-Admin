import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Input } from '../../../../shared/components/fields';
import { useProfile } from '../../pages/site/hooks/useProfile';
import type { ProfileFormValues } from '../../types';

// ── Validation Schema ──────────────────────────────────────
const validationSchema = Yup.object({
  fullName: Yup.string().trim().required('Fullname is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().trim().required('Phone number is required'),
  dateOfBirth: Yup.string().optional(),
  address: Yup.string().trim().optional(),
  gender: Yup.boolean().nullable().optional(),
});

// ── Helpers ────────────────────────────────────────────────
const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

// ── Component ──────────────────────────────────────────────
const PersonalInfor: React.FC = () => {
  const {
    user,
    fileInputRef,
    avatarPreview,
    isUploadingAvatar,
    isSavingProfile,
    handleFileChange,
    // handleDeleteAvatar,
    handleSaveProfile,
  } = useProfile();

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      fullName: user?.fullName ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      dateOfBirth: '',
      address: user?.address ?? '',
      gender: user?.gender ?? null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSaveProfile,
  });

  const handleDiscard = () => {
    formik.resetForm();
  };

  // Convert boolean | null  <->  radio string value
  const genderRadioValue =
    formik.values.gender === true ? 'male' : formik.values.gender === false ? 'female' : '';

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    formik.setFieldValue('gender', val === 'male' ? true : val === 'female' ? false : null);
  };

  const initials = user?.fullName ? getInitials(user.fullName) : 'ND';

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      {/* ── Section Header ── */}
      <Box sx={{ mb: 3.5 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: '#1a1a1a', mb: 0.75, fontSize: { xs: '1.25rem', md: '1.5rem' } }}
        >
          Personal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          Update your personal details and how others see you on the platform.
        </Typography>
      </Box>

      {/* ── Profile Picture ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, sm: 3 },
          mb: 3.5,
          flexWrap: 'wrap',
        }}
      >
        <Avatar
          src={avatarPreview ?? undefined}
          sx={{
            width: { xs: 72, sm: 88 },
            height: { xs: 72, sm: 88 },
            bgcolor: '#e0e0e0',
            color: '#616161',
            fontSize: { xs: '1.25rem', sm: '1.6rem' },
            fontWeight: 700,
            flexShrink: 0,
            border: '2px solid #f0f0f0',
            opacity: isUploadingAvatar ? 0.6 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          {!avatarPreview && initials}
        </Avatar>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: '#1a1a1a', mb: 0.4, fontSize: '1rem' }}
          >
            Profile Picture
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            JPG or PNG max size of 10MB
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              variant="outlined"
              size="small"
              disabled={isUploadingAvatar}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                borderColor: '#00ceb5',
                color: '#00ceb5',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                px: 2.5,
                py: 0.8,
                fontSize: '0.875rem',
                minWidth: 120,
                '&:hover': { borderColor: '#00b3a0', bgcolor: 'rgba(0, 206, 181, 0.05)' },
                '&.Mui-disabled': {
                  borderColor: 'rgba(0, 206, 181, 0.4)',
                  color: 'rgba(0, 206, 181, 0.4)',
                },
              }}
            >
              {isUploadingAvatar ? 'Uploading...' : 'Upload Image'}
            </Button>

            {/* <Button
              variant="outlined"
              size="small"
              disabled={!avatarPreview || isUploadingAvatar}
              onClick={handleDeleteAvatar}
              sx={{
                borderColor: '#bdbdbd',
                color: '#616161',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                px: 2.5,
                py: 0.8,
                fontSize: '0.875rem',
                '&:hover': { borderColor: '#9e9e9e', bgcolor: 'rgba(0, 0, 0, 0.04)' },
                '&.Mui-disabled': { borderColor: '#e0e0e0', color: '#bdbdbd' },
              }}
            >
              Delete
            </Button> */}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3.5, borderColor: '#f0f0f0' }} />

      {/* ── Form Fields ── */}
      <Grid container spacing={2.5}>
        {/* Fullname — readonly */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            label="Fullname"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={Boolean(formik.touched.fullName && formik.errors.fullName)}
            errorText={formik.errors.fullName}
            placeholder="Enter your fullname"
            disabled
            sx={{ '& .MuiInputBase-root': { bgcolor: '#fafafa' } }}
          />
        </Grid>

        {/* Email — disabled */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={Boolean(formik.touched.email && formik.errors.email)}
            errorText={formik.errors.email}
            typeInput="email"
            placeholder="Enter your email"
            disabled
            sx={{ '& .MuiInputBase-root': { bgcolor: '#fafafa' } }}
          />
        </Grid>

        {/* Phone Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
            errorText={formik.errors.phoneNumber}
            placeholder="+84 xxx xxx xxx"
          />
        </Grid>

        {/* Date of Birth */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={Boolean(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
            errorText={formik.errors.dateOfBirth}
            placeholder="DD/MM/YYYY"
          />
        </Grid>

        {/* Gender — Radio Male / Female */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                mb: 1.2,
                display: 'block',
                color: '#808080',
              }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              row
              name="gender"
              value={genderRadioValue}
              onChange={handleGenderChange}
              sx={{ gap: 1.5 }}
            >
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ].map(({ value, label }) => {
                const isSelected = genderRadioValue === value;
                return (
                  <FormControlLabel
                    key={value}
                    value={value}
                    label={label}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: '#bdbdbd',
                          '&.Mui-checked': { color: '#00ceb5' },
                          padding: '5px',
                        }}
                      />
                    }
                    sx={{
                      m: 0,
                      pl: 1,
                      pr: 2,
                      py: 0.9,
                      border: '1px solid',
                      borderRadius: 2,
                      borderColor: isSelected ? '#00ceb5' : '#9e9e9e',
                      bgcolor: isSelected ? 'rgba(0, 206, 181, 0.06)' : 'transparent',
                      transition: 'all 0.18s ease',
                      cursor: 'pointer',
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.9rem',
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? '#008f80' : '#424242',
                        lineHeight: 1,
                      },
                      '&:hover': {
                        borderColor: '#00ceb5',
                        bgcolor: 'rgba(0, 206, 181, 0.04)',
                      },
                    }}
                  />
                );
              })}
            </RadioGroup>
          </Box>
        </Grid>

        {/* Address — full width */}
        <Grid size={{ xs: 12 }}>
          <Input
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={Boolean(formik.touched.address && formik.errors.address)}
            errorText={formik.errors.address}
            placeholder="Enter your address"
          />
        </Grid>
      </Grid>

      {/* ── Action Buttons ── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          mt: 4,
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="outlined"
          onClick={handleDiscard}
          disabled={isSavingProfile || !formik.dirty}
          sx={{
            borderColor: '#bdbdbd',
            color: '#616161',
            fontWeight: 600,
            textTransform: 'none',
            px: 3,
            py: 1.1,
            borderRadius: 2,
            '&:hover': { borderColor: '#9e9e9e', bgcolor: 'rgba(0, 0, 0, 0.04)' },
            '&.Mui-disabled': { borderColor: '#e0e0e0', color: '#bdbdbd' },
          }}
        >
          Discard Changes
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSavingProfile || !formik.dirty}
          sx={{
            bgcolor: '#00ceb5',
            color: '#ffffff',
            fontWeight: 600,
            textTransform: 'none',
            px: 3,
            py: 1.1,
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#00b3a0', boxShadow: 'none' },
            '&.Mui-disabled': { bgcolor: 'rgba(0, 206, 181, 0.4)', color: '#ffffff' },
          }}
        >
          {isSavingProfile ? 'Saving...' : 'Save changes'}
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfor;