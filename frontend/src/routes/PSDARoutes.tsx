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
        <Route path="/" element={<PSDADashboard />} />
        <Route path="/events" element={<PSDAEvents />} />
        <Route path="/events/new" element={<PSDAEventForm />} />
        <Route path="/events/:id" element={<PSDAEventForm />} />
        <Route path="/applications" element={<PSDAApplications />} />
        <Route path="/applications/:id" element={<PSDAApplicationDetail />} />
      </Routes>
    </PSDALayout>
  );
};

export default PSDARoutes;


