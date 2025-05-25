import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';
import CoursPage from '../pages/CoursPage';

const AppRouter = () => {
    return (
        <Routes>  
            {/* ניווט ברירת מחדל ישירות ל-login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* עמודי אפליקציה אחרי התחברות */}
            <Route path="/home" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="user" element={<UserManagement />} />
                <Route path="cours/:id" element={<CoursPage />} />
            </Route>

            {/* עמוד התחברות */}
            <Route path="/login" element={<LoginPage />}>
                <Route index element={<Login />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
