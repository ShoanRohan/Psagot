import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';
import AddMeeting from '../pages/AddMeeting';
import MeetingPage from '../pages/MeetingPage';
import EditMeeting from '../pages/EditMeeting';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<LoginPage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<MeetingPage/>} />
                <Route path='/users' element={<UserManagement />} />
                <Route path='/rooms' element={<span>page Rooms</span>} />
                <Route path="/calendar" element={<span>calander Rooms</span>} />
                <Route path='add-meeting' element={<AddMeeting />} />
                <Route path="edit-meeting/:meetingId" element={<EditMeeting />} />
                </Route>
        </Routes>
    );
};

export default AppRouter;
