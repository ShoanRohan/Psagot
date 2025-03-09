import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import RoomDetails from '../components/RoomDetails';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/room' element={<RoomDetails/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;