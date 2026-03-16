import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from '../pages/site/homePage';
import ProfilePage from '../pages/site/profile';

const UserRoutes = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<HomePage />} />

      {/* Placeholder routes - will be implemented later */}
      <Route path="/explore" element={<div>Explore Page - Coming Soon</div>} />
      <Route path="/community" element={<div>Community Page - Coming Soon</div>} />
      <Route path="/offers" element={<div>Offers Page - Coming Soon</div>} />
      <Route path="/post/create" element={<div>Create Post - Coming Soon</div>} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
