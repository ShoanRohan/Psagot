import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import UserSearch from '../components/UserSearch';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                {/* <Route path='/' element={<HomePage/>}/> */}
                <Route path='/' element={<UserSearch/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;