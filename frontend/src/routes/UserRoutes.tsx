import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '@/components/layouts/UserLayout';
import UserDashboard from '@/pages/user/UserDashboard';
import Savings from '@/pages/user/Savings';
import Profile from '@/pages/user/Profile';
import Events from '@/pages/user/Events';

const UserRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        {/* <Route path="/savings" element={<Savings />} /> */}
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;


