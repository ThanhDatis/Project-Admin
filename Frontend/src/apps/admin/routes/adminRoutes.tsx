import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthGuard, RoleGuard } from '../../../shared/routes/guards';
import LayoutDashboard from '../components/layouts/layoutDashboard';
import Dashboard from '../pages/cms/Dashboard';
import Profile from '../pages/cms/Profile';
import Setting from '../pages/cms/Setting';

const AdminRoutes = () => {
  return (
    <AuthGuard>
      <Routes>
        <Route path="/" element={<LayoutDashboard />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard — tất cả admin roles */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Profile + Setting — tất cả admin roles */}
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />

          {/* Users — chỉ SysAdmin */}
          <Route
            path="users"
            element={
              <RoleGuard allowedRoles={['SysAdmin']}>
                <div>Users Page — coming soon</div>
              </RoleGuard>
            }
          />

          {/* Hotels — SysAdmin + HotelOwner */}
          <Route
            path="hotels"
            element={
              <RoleGuard allowedRoles={['SysAdmin', 'HotelOwner']}>
                <div>Hotels Page — coming soon</div>
              </RoleGuard>
            }
          />

          {/* Rooms — HotelOwner */}
          <Route
            path="rooms"
            element={
              <RoleGuard allowedRoles={['HotelOwner']}>
                <div>Rooms Page — coming soon</div>
              </RoleGuard>
            }
          />

          {/* Bookings — SysAdmin + HotelOwner + Receptionist */}
          <Route
            path="bookings"
            element={
              <RoleGuard allowedRoles={['SysAdmin', 'HotelOwner', 'Receptionist']}>
                <div>Bookings Page — coming soon</div>
              </RoleGuard>
            }
          />

          {/* Check-in/out — Receptionist */}
          <Route
            path="checkin"
            element={
              <RoleGuard allowedRoles={['Receptionist']}>
                <div>Check-in/Out Page — coming soon</div>
              </RoleGuard>
            }
          />

          {/* Employees — SysAdmin + HotelOwner */}
          <Route
            path="employees"
            element={
              <RoleGuard allowedRoles={['SysAdmin', 'HotelOwner']}>
                <div>Employees Page — coming soon</div>
              </RoleGuard>
            }
          />

          {/* Room status — Housekeeping */}
          <Route
            path="rooms/status"
            element={
              <RoleGuard allowedRoles={['Housekeeping']}>
                <div>Room Status Page — coming soon</div>
              </RoleGuard>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthGuard>
  );
};

export default AdminRoutes;
