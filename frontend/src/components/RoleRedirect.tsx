import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RoleRedirect: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'user';
  return <Navigate to={`/${role}/dashboard`} replace />;
};

export default RoleRedirect;


