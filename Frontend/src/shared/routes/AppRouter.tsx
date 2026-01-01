import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import SignInPage from '../../apps/user/pages/site/signIn';
import SignUpPage from '../../apps/user/pages/site/signUp';
import { ToastContainerComponent } from '../components/toastMessage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth" element={<Navigate to="/auth/signin" replace />} />
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />

        {/* Catch all - redirect to signin */}
        <Route path="*" element={<Navigate to="/auth/signin" replace />} />
      </Routes>

      <ToastContainerComponent />
    </BrowserRouter>
  );
};

export default AppRouter;
