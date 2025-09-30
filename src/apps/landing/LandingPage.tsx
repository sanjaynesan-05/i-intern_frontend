import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingHomePage from './pages/LandingHomePage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import { LoginPage } from './components/LoginPage';
import { StudentRegistrationPage } from './components/StudentRegistrationPage';
import { CompanyRegistrationPage } from './components/CompanyRegistrationPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import InternsTermsPage from './pages/interns-terms-and-conditions';
import EmployerTermsPage from './pages/employer-terms';

const LandingPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingHomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/student" element={<StudentRegistrationPage />} />
      <Route path="/register/company" element={<CompanyRegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/terms/interns" element={<InternsTermsPage />} />
      <Route path="/terms/employers" element={<EmployerTermsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LandingPage;


