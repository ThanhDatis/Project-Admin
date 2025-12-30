import EmailIcon from '@mui/icons-material/EmailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Divider, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { orange } from '../../../../shared/common/colors';
import { Input } from '../../../../shared/components/fields';
import LoadingButton from '../../../../shared/components/loadingButton';
import type { SignInFormValues } from '../../../../shared/types';

interface SignInProps {
  onSubmit: (values: SignInFormValues) => Promise<void>;
  onSwitchToSignUp: () => void;
  onSocialLogin: (provider: 'google' | 'facebook') => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});

const SignIn: React.FC<SignInProps> = ({
  onSubmit,
  onSwitchToSignUp,
  onSocialLogin,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: SignInFormValues) => {
    await onSubmit(values);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        padding: '40px',
      }}
    >
      {/* Header */}
      <Box sx={{ marginBottom: '32px', textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '8px',
          }}
        >
          Welcome, Joe!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#666666',
            fontSize: '14px',
          }}
        >
          Please enter your login information to continue...
        </Typography>
      </Box>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
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
                    <EmailIcon sx={{ color: '#666', fontSize: 20 }} />
                  </InputAdornment>
                }
              />
            </Box>

            {/* Password */}
            <Box sx={{ marginBottom: '8px' }}>
              <Input
                label="Password"
                name="password"
                value={values.password}
                isError={Boolean(touched.password && errors.password)}
                errorText={errors.password}
                placeholder="Enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                typeInput={showPassword ? 'text' : 'password'}
                prefixIcon={
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#666', fontSize: 20 }} />
                  </InputAdornment>
                }
                suffixIcon={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20, color: '#666' }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: '#666' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>

            {/* Forgot Password */}
            <Box sx={{ textAlign: 'right', marginBottom: '24px' }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: orange[600],
                  fontSize: '14px',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            {/* Sign In Button */}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{
                backgroundColor: orange[600],
                color: '#fff',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                marginBottom: '24px',
                '&:hover': {
                  backgroundColor: orange[700],
                },
                '&:disabled': {
                  backgroundColor: orange[300],
                },
              }}
            >
              Sign In
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
                  color: '#999',
                  fontSize: '14px',
                }}
              >
                Or sign in with
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Social Login */}
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
                onClick={() => onSocialLogin('google')}
                sx={{
                  borderColor: '#E0E0E0',
                  color: '#1A1A1A',
                  padding: '10px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#BDBDBD',
                    backgroundColor: '#F5F5F5',
                  },
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => onSocialLogin('facebook')}
                sx={{
                  borderColor: '#E0E0E0',
                  color: '#1A1A1A',
                  padding: '10px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#BDBDBD',
                    backgroundColor: '#F5F5F5',
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
                  color: '#666',
                  fontSize: '14px',
                }}
              >
                Don't have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToSignUp}
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
                  Sign up now
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignIn;
