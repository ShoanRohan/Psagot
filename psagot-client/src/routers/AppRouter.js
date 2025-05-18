import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';
import RoomsGrid from '../components/RoomsGrid';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<LoginPage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<span>page Meetings</span>} />
                <Route path='/users' element={<UserManagement />} />
                <Route path='/rooms' element={<RoomsGrid/>} />
                <Route path="/calendar" element={<span>calander Rooms</span>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;