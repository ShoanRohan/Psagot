import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';
import CoursesPage from '../pages/CoursesPage';

const AppRouter = () => {
    return (
        <Routes>  
            <Route path='/' element={<Layout />}>
                <Route path='/home' element={<HomePage />} />  
                <Route path='user' element={<UserManagement />} />
                
                
                <Route path='courses/:id' element={<CoursesPage />} />
            </Route> 

            <Route path='/' element={<LoginPage />}> 
                <Route path='login' element={<Login />} /> 
            </Route>
        </Routes>
    );
};

export default AppRouter;
