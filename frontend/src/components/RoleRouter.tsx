import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import UserRoutes from '@/routes/UserRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import PSDARoutes from '@/routes/PSDARoutes';

const RoleRouter: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return null;
  }

  // Extract the role from the path
  const pathSegments = location.pathname.split('/');
  const roleFromPath = pathSegments[1]; // e.g., 'user', 'admin', 'psda'

  // Determine which routes to render
  // 1) If the URL path explicitly specifies a role, honor it.
  // 2) Otherwise, fall back to the authenticated user's role.
  const getRoutes = () => {
    if (roleFromPath === 'user') return <UserRoutes />;
    if (roleFromPath === 'admin') return <AdminRoutes />;
    if (roleFromPath === 'psda') return <PSDARoutes />;
    
    if (user.role === 'admin') return <AdminRoutes />;
    if (user.role === 'psda') return <PSDARoutes />;
    return <UserRoutes />;
  };

  return getRoutes();
};

export default RoleRouter;
