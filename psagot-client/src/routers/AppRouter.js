import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';

const AppRouter = () => {
    return (

        <Routes>
            <Route path='/' element={<LoginPage />}>
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='/home' element={<Layout />}>
                <Route path='' element={<HomePage />} />
                <Route path='user' element={<UserManagement />} />

            </Route>

        </Routes>
    );
};

export default AppRouter;
