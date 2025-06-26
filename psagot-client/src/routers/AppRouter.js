import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MeetingPage from '../pages/MeetingPage';
import MeetingForm from '../components/MeetingForm';

const AppRouter = () => {
    const navigate = useNavigate(); 

    // Handle navigation to edit meeting
   const handleEditMeeting = (meeting) => {
    // Navigate with meeting ID and optionally pass meeting data via state
    navigate(`/edit-meeting/${meeting.meetingId}`, { 
      state: { meeting } 
    });
  };

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
        element={<MeetingPage onEdit={handleEditMeeting} />} 
      />
      <Route 
        path="/edit-meeting/:meetingId" 
        element={<MeetingForm />} 
      />
      <Route 
        path="/add-meeting" 
        element={<MeetingForm />} 
      />
                
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