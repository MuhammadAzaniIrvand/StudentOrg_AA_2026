import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '@/components/layouts/UserLayout';
import UserDashboard from '@/pages/user/UserDashboard';
// import Savings from '@/pages/user/Savings'; // Masih dikomen di kode asli Anda
import Profile from '@/pages/user/Profile';
import Events from '@/pages/user/Events';

const UserRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        {/* 
           PERBAIKAN:
           Kita tambahkan 'index' agar URL '/user' bisa dibuka.
           Kita tambahkan path 'dashboard' agar URL '/user/dashboard' juga bisa dibuka.
        */}
        
        {/* 1. Menangani saat user membuka "/user" saja */}
        <Route index element={<UserDashboard />} />

        {/* 2. Menangani saat user membuka "/user/dashboard" */}
        <Route path="dashboard" element={<UserDashboard />} />

        {/* 3. Menangani "/user/events" */}
        <Route path="events" element={<Events />} />

        {/* 4. Menangani "/user/profile" */}
        <Route path="profile" element={<Profile />} />

        {/* Jika ada halaman simpanan nanti */}
        {/* <Route path="savings" element={<Savings />} /> */}
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;