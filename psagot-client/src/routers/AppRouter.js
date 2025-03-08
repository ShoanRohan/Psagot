import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import UserManagement from '../components/UserManagement';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/user' element={<UserManagement/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;