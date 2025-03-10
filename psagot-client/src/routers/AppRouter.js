import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/meetings/:id" element={<h1>עמוד המפגש</h1>}/>

            </Route>
        </Routes>
    );
};

export default AppRouter;