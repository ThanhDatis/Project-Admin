import EmailIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { gray, orange, secondaryTextColor } from '../../../../shared/common/colors';
import { Input } from '../../../../shared/components/fields';
import LoadingButton from '../../../../shared/components/loadingButton';
import SocialLogin from '../../../../shared/components/socialLogin';
import type { SignInFormValues } from '../../types';

interface SignInFormProps {
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

const SignInForm: React.FC<SignInFormProps> = ({
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
      <Box sx={{ marginBottom: '32px', textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          Welcome, Joe!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: gray[600],
            fontSize: '14px',
          }}
        >
          Please enter your login information to continue...
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
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
                    <LockIcon sx={{ color: gray[600], fontSize: 20 }} />
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
                        <VisibilityOffIcon sx={{ fontSize: 20, color: gray[600] }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: gray[600] }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>

            <Box sx={{ textAlign: 'right', marginBottom: '24px' }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: orange[600],
                  fontSize: '14px',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>

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

            <SocialLogin onSocialLogin={onSocialLogin} dividerText="Or sign in with" />

            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: gray[600],
                  lineHeight: 0,
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

export default SignInForm;
