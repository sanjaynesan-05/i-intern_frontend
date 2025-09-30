import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import DashboardPage from './pages/DashboardPage';
import BuildResumePage from './pages/BuildResumePage';
import ProfilePage from './pages/ProfilePage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const InternsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="build-resume" element={<BuildResumePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="internship/:id" element={<InternshipDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default InternsDashboard;


