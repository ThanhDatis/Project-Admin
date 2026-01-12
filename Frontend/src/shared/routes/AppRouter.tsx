import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import AuthPage from '../../apps/user/components/layouts/authPage';
import UserRoutes from '../../apps/user/routes/userRoutes';
import { ToastContainerComponent } from '../components/toastMessage';

const AppRouter = () => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken')); // Thay đổi logic xác thực theo ứng dụng của bạn
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - Public (dùng AuthPage duy nhất) */}
        <Route path="/auth/signin" element={<AuthPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />
        <Route path="/auth" element={<Navigate to="/auth/signin" replace />} />

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
