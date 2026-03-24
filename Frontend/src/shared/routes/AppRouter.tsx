import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import AdminRoutes from '../../apps/admin/routes/adminRoutes';
import AuthPage from '../../apps/user/components/layouts/authPage';
import { OAuthCallback } from '../../apps/user/components/SignIn/';
import { isAdminRole } from '../../apps/user/pages/site/hooks/useSignIn';
import UserRoutes from '../../apps/user/routes/userRoutes';
import { useAuthStore } from '../../apps/user/store';
import { ToastContainerComponent } from '../components/toastMessage';
import { GuestGuard } from '../routes/guards';

const AppRouter = () => {
  const { isAuthenticated, initializeAuth, user } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const renderProtectedRoutes = () => {
    if (user?.role && isAdminRole(user.role)) {
      return <Route path="/*" element={<AdminRoutes />} />;
    }
    return <Route path="/*" element={<UserRoutes />} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes — GuestGuard chặn user đã login */}
        <Route
          path="/auth/signin"
          element={
            <GuestGuard>
              <AuthPage />
            </GuestGuard>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <GuestGuard>
              <AuthPage />
            </GuestGuard>
          }
        />
        <Route path="/auth" element={<Navigate to="/auth/signin" replace />} />

        {/* OAuth Callback */}
        <Route path="/oauth-callback" element={<OAuthCallback />} />

        {/* Protected Routes — phân nhánh theo role */}
        {isAuthenticated ? (
          renderProtectedRoutes()
        ) : (
          <Route path="/*" element={<Navigate to="/auth/signin" replace />} />
        )}
      </Routes>

      <ToastContainerComponent />
    </BrowserRouter>
  );
};

export default AppRouter;
