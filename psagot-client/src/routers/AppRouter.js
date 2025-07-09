import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import Login from '../components/Login';
import Register from '../components/Register';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';
import CoursPage from '../pages/CoursPage';
import RegisterPage from '../pages/RegisterPage';
import AddCoursePage from '../pages/AddCoursePage';
import TopicDialog from '../components/TopicDialog';



const AppRouter = () => {
  return (
    <Routes>
      {/* עמוד התחברות */}
      <Route path="/" element={<LoginPage />}>
        <Route index element={<Login />} />
      </Route>

      {/* עמוד הרשמה */}
      <Route path="/register" element={<RegisterPage />}>
        <Route index element={<Register />} />
      </Route>

      {/* עמודים אחרי התחברות – תחת Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="cours/:id" element={<CoursPage />} />
        <Route path="user" element={<UserManagement />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="/newCourse" element={<AddCoursePage />} />
      </Route>

      {/* כל כתובת שלא קיימת */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/TopicDialog/:id" element={<TopicDialog />} />

    </Routes>
  );
};

export default AppRouter;