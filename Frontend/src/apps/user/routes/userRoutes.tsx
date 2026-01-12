import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from '../pages/site/homePage';

const UserRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes - Sau khi đăng nhập */}
      <Route path="/" element={<HomePage />} />

      {/* Thêm các routes khác của user ở đây */}
      {/* <Route path="/profile" element={<ProfilePage />} /> */}
      {/* <Route path="/bookings" element={<BookingsPage />} /> */}

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
