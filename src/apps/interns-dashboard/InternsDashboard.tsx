import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import DashboardPage from './pages/DashboardPage';
import BuildResumePage from './pages/BuildResumePage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import InternshipsPage from './pages/InternshipsPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const InternsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="internships" element={<InternshipsPage />} />
        <Route path="build-resume" element={<BuildResumePage />} />
        <Route path="profile" element={<EditProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="internship/:id" element={<InternshipDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default InternsDashboard;


