import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserLayout from '@/components/layouts/UserLayout';
import AdminLayout from '@/components/layouts/AdminLayout';
import PSDALayout from '@/components/layouts/PSDALayout';
import UserDashboard from '@/pages/user/UserDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import PSDADashboard from '@/pages/psda/PSDADashboard';

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'user':
      return (
        <UserLayout>
          <UserDashboard />
        </UserLayout>
      );
    case 'admin':
      return (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      );
    case 'psda':
      return (
        <PSDALayout>
          <PSDADashboard />
        </PSDALayout>
      );
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Role Tidak Dikenali
            </h1>
            <p className="text-gray-600">
              Role "{user.role}" tidak memiliki dashboard yang sesuai.
            </p>
          </div>
        </div>
      );
  }
};

export default RoleBasedDashboard;
