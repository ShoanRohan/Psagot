import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomsPage from '../pages/RoomsPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<RoomsPage/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;