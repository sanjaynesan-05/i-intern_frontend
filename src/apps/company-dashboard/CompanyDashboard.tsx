import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Internships } from './pages/Internships';
import { Applicants } from './pages/Applicants';
import { Settings } from './pages/Settings';
import PostInternshipPage from './pages/PostInternshipPage';

const CompanyDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/company/dashboard" replace />} />
      <Route path="" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="internships" element={<Internships />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="settings" element={<Settings />} />
        <Route path="post-internship" element={<PostInternshipPage />} />
      </Route>
    </Routes>
  );
};

export default CompanyDashboard;


