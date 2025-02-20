import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import UsersTable from '../pages/UsersTable';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/users' element={<UsersTable/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;