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

const AppRouter = () => {
	return (
		<Routes>
			{/* עמוד התחברות – ברירת מחדל בנתיב '/' */}
			<Route path="/" element={<LoginPage />}>
				<Route index element={<Login />} />
			</Route>

			{/* עמודים אחרי התחברות */}
			<Route path="/" element={<Layout />}>
				<Route path="home" element={<HomePage />} />
				<Route path="cours/:id" element={<CoursPage />} />
				<Route path="user" element={<UserManagement />} />
				<Route path="courses" element={<CoursesPage />} />
			</Route>

			{/* עמוד הרשמה */}
			<Route path="/register" element={<RegisterPage />}>
				<Route index element={<Register />} />
			</Route>

			{/* ניווט שגוי ל'/' */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default AppRouter;
