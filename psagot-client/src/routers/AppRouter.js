import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomsPage from '../pages/RoomsPage';
import RoomSchedule from '../components/RoomsScheduleGrid';
import UserManagement from '../pages/UserManagement';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<LoginPage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<span>page Meetings</span>} />
                <Route path='/users' element={<UserManagement />} />
                <Route path='/rooms' element={<RoomsPage/>} />
                <Route path="/calendar" element={<span>calander Rooms</span>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;