import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import LoginPage from '../pages/LoginPage';
import MeetingPage from '../pages/MeetingPage';
import UserManagement from '../pages/UserManagement';
import MeetingForm from '../components/MeetingForm';
import MeetingLocatorBar from '../components/MeetingLocatorBar';


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
                <Route path='/add-meeting' element={<MeetingForm  />} />
                <Route path="/edit-meeting/:meetingId" element={<MeetingForm />} />
              <Route path='/MeetingLocatorBar' element={<MeetingLocatorBar />} /> 

                </Route>
        </Routes>
    );
};

export default AppRouter;


