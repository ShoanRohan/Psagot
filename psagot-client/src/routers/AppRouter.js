import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomsPage from '../pages/RoomsPage';
import RoomsSchedule from '../components/RoomsScheduleGrid';
import UserManagement from'../pages/UserManagement'
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomEdit from '../components/RoomEdit';
import RoomsScheduleGrid from '../components/RoomsScheduleGrid';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<LoginPage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<span>page Meetings</span>} />
                <Route path='/users' element={<UserManagement />} />
                <Route path='/rooms' element={<RoomsScheduleGrid/>} />
                <Route path="/calendar" element={<span>calander Rooms</span>} />
                <Route path='/room' element={<RoomEdit />} />
                <Route path='/roomSearch' element={<RoomsScheduleSearch />} />   
            </Route>
        </Routes>
       
    );
};

export default AppRouter;