import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PSDALayout from '@/components/layouts/PSDALayout';
import PSDADashboard from '@/pages/psda/PSDADashboard';
import PSDAEvents from '@/pages/psda/events/PSDAEvents';
import PSDAEventForm from '@/pages/psda/events/PSDAEventForm';
import PSDAApplications from '@/pages/psda/applications/PSDAApplications';
import PSDAApplicationDetail from '@/pages/psda/applications/PSDAApplicationDetail';

const PSDARoutes: React.FC = () => {
  return (
    <PSDALayout>
      <Routes>
        {/* 
          PERBAIKAN: 
          Karena di App.tsx sudah ada "/psda/*", 
          maka di sini tidak perlu tulis "/psda" lagi.
        */}

        {/* 1. Menangani saat user membuka "/psda" saja (tanpa slash apapun) */}
        <Route index element={<PSDADashboard />} />

        {/* 2. Menangani "/psda/dashboard". Cukup tulis "dashboard" */}
        <Route path="dashboard" element={<PSDADashboard />} />

        {/* 3. Menangani "/psda/events" */}
        <Route path="events" element={<PSDAEvents />} />

        {/* 4. Menangani "/psda/events/new" */}
        <Route path="events/new" element={<PSDAEventForm />} />

        {/* 5. Menangani "/psda/events/:id" */}
        <Route path="events/:id" element={<PSDAEventForm />} />

        {/* 6. Menangani "/psda/applications" */}
        <Route path="applications" element={<PSDAApplications />} />

        {/* 7. Menangani "/psda/applications/:id" */}
        <Route path="applications/:id" element={<PSDAApplicationDetail />} />
      </Routes>
    </PSDALayout>
  );
};

export default PSDARoutes;