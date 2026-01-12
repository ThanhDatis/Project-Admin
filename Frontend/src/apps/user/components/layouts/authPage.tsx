import React from 'react';
import { useLocation } from 'react-router-dom';

import AuthLayout from '../../components/layouts/authLayout';

const AuthPage: React.FC = () => {
  const location = useLocation();

  // Detect form type từ URL mà không trigger re-render
  const defaultForm = location.pathname.includes('signup') ? 'signup' : 'signin';

  return <AuthLayout key="auth-layout" defaultForm={defaultForm} />;
};

export default AuthPage;
