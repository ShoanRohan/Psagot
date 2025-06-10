import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import Login from '../components/Login';
import Register from '../components/Register';
import LoginPage from '../pages/LoginPage';
import MeetingPage from '../pages/MeetingPage';
import UserManagement from '../pages/UserManagement';
import MeetingForm from '../components/MeetingForm';
import MeetingLocatorBar from '../components/MeetingLocatorBar';
import RegisterPage from '../pages/RegisterPage';
import MeetingTable from '../components/MeetingTable';

const AppRouter = () => {
    return (         
    <Routes>
        <Route index element={<HomePage />} />
        <Route path='/' element={<Layout />}/>
        <Route path='/' element={<LoginPage />} />
        <Route path='/courses' element={<span>page Courses</span>} />
        <Route path='/meetings' element={<MeetingPage/>} />
        <Route path='/users' element={<UserManagement />} />
        <Route path='/rooms' element={<span>page Rooms</span>} />
        <Route path="/calendar" element={<span>calander Rooms</span>} />
        <Route path='/add-meeting' element={<MeetingForm  />} />
        <Route path="/edit-meeting/:meetingId" element={<MeetingForm />} />
        <Route path='/MeetingLocatorBar' element={<MeetingLocatorBar />} /> 
        <Route path='' element={<LoginPage />}/>
        <Route path='login' element={<Login />} />
        <Route path='' element={<RegisterPage />}/>
        <Route path='Register' element={<Register />} />
        <Route path='courses' element={<CoursesPage />} />
        <Route path='meetings' element={<MeetingTable />} /> 


          
    

        </Routes>
    );
};

export default AppRouter;


