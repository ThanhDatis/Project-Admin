import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import AuthPage from '../../apps/user/components/layouts/authPage';
import { OAuthCallback } from '../../apps/user/components/SignIn/';
import UserRoutes from '../../apps/user/routes/userRoutes';
import { useAuthStore } from '../../apps/user/store';
import { ToastContainerComponent } from '../components/toastMessage';

import { useEffect } from 'react';

const AppRouter = () => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - Public (dùng AuthPage duy nhất) */}
        <Route path="/auth/signin" element={<AuthPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />
        <Route path="/auth" element={<Navigate to="/auth/signin" replace />} />

        <Route path="/oauth-callback" element={<OAuthCallback />} />

        {/* User Routes - Protected (sau khi đăng nhập) */}
        {isAuthenticated ? (
          <Route path="/*" element={<UserRoutes />} />
        ) : (
          <Route path="/*" element={<Navigate to="/auth/signin" replace />} />
        )}
      </Routes>

      <ToastContainerComponent />
    </BrowserRouter>
  );
};

export default AppRouter;
