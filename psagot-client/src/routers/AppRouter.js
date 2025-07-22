import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MeetingPage from '../pages/MeetingPage';
import MeetingForm from '../components/MeetingForm';
import UserTabel from '../components/UserTabel';
const AppRouter = () => {
   

    return (         
        <Routes>
            {/* Protected routes wrapped by Layout */}
            <Route path="/" element={<Layout />}>
                {/* Default route when accessing '/' */}
                <Route index element={<HomePage />} />
                
                {/* Main application routes */}
                <Route path="courses" element={<CoursesPage />} />
                 <Route 
        path="/meetings" 
        element={<MeetingPage  />} 
      />
      <Route 
        path="/edit-meeting/:meetingId" 
        element={<MeetingForm />} 
      />
      <Route 
        path="/add-meeting" 
        element={<MeetingForm />} 
      />
                 <Route path='/users' element={<UserTabel/>}/>
                {/* Future routes - uncomment when ready */}
                {/* <Route path="rooms" element={<RoomsPage />} /> */}
                {/* <Route path="calendar" element={<CalendarPage />} /> */}
            </Route>

            {/* Standalone routes (authentication pages) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};

export default AppRouter;  