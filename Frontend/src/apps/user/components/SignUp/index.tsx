import EmailIcon from '@mui/icons-material/EmailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import {
  borderLight,
  borderLine,
  errorColor,
  gray,
  orange,
  primaryTextColor,
  secondaryTextColor,
} from '../../../../shared/common/colors';
import { Input } from '../../../../shared/components/fields';
import LoadingButton from '../../../../shared/components/loadingButton';
import type { SignUpFormValues } from '../../types';

interface SignUpProps {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
  onSwitchToSignIn: () => void;
  onSocialSignUp: (provider: 'google' | 'facebook') => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  fullName: Yup.string().min(2, 'Tên phải có ít nhất 2 ký tự').required('Vui lòng nhập họ tên'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
    )
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
  agreeTerms: Yup.boolean()
    .oneOf([true], 'Bạn phải đồng ý với điều khoản sử dụng')
    .required('Bạn phải đồng ý với điều khoản sử dụng'),
});

const SignUp: React.FC<SignUpProps> = ({
  onSubmit,
  onSwitchToSignIn,
  onSocialSignUp,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: SignUpFormValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    await onSubmit(values);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        padding: '40px',
      }}
    >
      {/* Logo & Header */}
      <Box sx={{ marginBottom: '32px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <PublicIcon
            sx={{
              color: orange[600],
              fontSize: 32,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            HotelSocial
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          Create a new account
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: gray[600],
            fontSize: '14px',
          }}
        >
          Join the travel community, unlock exclusive hotel deals, and connect with like-minded
          people ...
        </Typography>
      </Box>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            {/* Full Name */}
            <Box sx={{ marginBottom: '16px' }}>
              <Input
                label="Full name"
                name="fullName"
                value={values.fullName}
                isError={Boolean(touched.fullName && errors.fullName)}
                errorText={errors.fullName}
                placeholder="Enter your full name"
                onChange={handleChange}
                onBlur={handleBlur}
                prefixIcon={
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: gray[600], fontSize: 20 }} />
                  </InputAdornment>
                }
              />
            </Box>

            {/* Email */}
            <Box sx={{ marginBottom: '16px' }}>
              <Input
                label="Email"
                name="email"
                value={values.email}
                isError={Boolean(touched.email && errors.email)}
                errorText={errors.email}
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                typeInput="email"
                prefixIcon={
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: gray[600], fontSize: 20 }} />
                  </InputAdornment>
                }
              />
            </Box>

            {/* Password & Confirm Password in one row */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <Input
                label="Password"
                name="password"
                value={values.password}
                isError={Boolean(touched.password && errors.password)}
                errorText={errors.password}
                placeholder="••••••"
                onChange={handleChange}
                onBlur={handleBlur}
                typeInput={showPassword ? 'text' : 'password'}
                prefixIcon={
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: gray[600], fontSize: 20 }} />
                  </InputAdornment>
                }
                suffixIcon={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20, color: gray[600] }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: gray[600] }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Input
                label="Confirm password"
                name="confirmPassword"
                value={values.confirmPassword}
                isError={Boolean(touched.confirmPassword && errors.confirmPassword)}
                errorText={errors.confirmPassword}
                placeholder="••••••"
                onChange={handleChange}
                onBlur={handleBlur}
                typeInput={showConfirmPassword ? 'text' : 'password'}
                prefixIcon={
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: gray[600], fontSize: 20 }} />
                  </InputAdornment>
                }
                suffixIcon={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20, color: gray[600] }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: gray[600] }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>

            {/* Terms Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.agreeTerms}
                  onChange={(e) => setFieldValue('agreeTerms', e.target.checked)}
                  sx={{
                    color: touched.agreeTerms && errors.agreeTerms ? errorColor : undefined,
                    '&.Mui-checked': {
                      color: orange[600],
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '14px', color: gray[600] }}>
                  I agree to the{' '}
                  <Link
                    href="#"
                    sx={{
                      color: orange[600],
                      fontWeight: 500,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Terms of use
                  </Link>{' '}
                  &{' '}
                  <Link
                    href="#"
                    sx={{
                      color: orange[600],
                      fontWeight: 500,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Privacy policy
                  </Link>{' '}
                  of HotelSocial
                </Typography>
              }
              sx={{ marginBottom: '8px' }}
            />
            {touched.agreeTerms && errors.agreeTerms && (
              <Typography
                sx={{
                  fontSize: '12px',
                  color: errorColor,
                  marginLeft: '32px',
                  marginBottom: '16px',
                }}
              >
                {errors.agreeTerms}
              </Typography>
            )}

            {/* Sign Up Button */}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{
                backgroundColor: orange[600],
                color: secondaryTextColor,
                padding: '12px',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                marginTop: '8px',
                marginBottom: '24px',
                '&:hover': {
                  backgroundColor: orange[700],
                },
                '&:disabled': {
                  backgroundColor: orange[300],
                },
              }}
            >
              Sign Up
            </LoadingButton>

            {/* Divider */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <Divider sx={{ flex: 1 }} />
              <Typography
                sx={{
                  padding: '0 16px',
                  color: gray[500],
                  fontSize: '14px',
                }}
              >
                Or sign up with
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Social Sign Up */}
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => onSocialSignUp('google')}
                sx={{
                  borderColor: borderLight,
                  color: primaryTextColor,
                  padding: '10px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: borderLine,
                    backgroundColor: gray[100],
                  },
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => onSocialSignUp('facebook')}
                sx={{
                  borderColor: borderLight,
                  color: primaryTextColor,
                  padding: '10px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: borderLine,
                    backgroundColor: gray[100],
                  },
                }}
              >
                Facebook
              </Button>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: gray[600],
                  fontSize: '14px',
                }}
              >
                Already have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToSignIn}
                  underline="none"
                  sx={{
                    color: orange[600],
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign In now
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;
