import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MeetingPage from '../pages/MeetingPage';
import UserManagement from '../pages/UserManagement';
import MeetingForm from '../components/MeetingForm';

const AppRouter = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="meetings" element={<MeetingPage />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="edit-meeting/:meetingId" element={<MeetingForm  />} />
        <Route path="add-meeting" element={<MeetingForm />} />

      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;