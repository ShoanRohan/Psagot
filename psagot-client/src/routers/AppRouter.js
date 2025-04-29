import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomsScheduleGrid from '../components/RoomsScheduleGrid'

const AppRouter = () => {
    return (
        
        <Routes>  
             <Route path='/home' element={<Layout/>}>
                <Route index element={<HomePage/>}/> 
            </Route>
            {/* <Route path='/rooms' element={<Layout/>}>
                <Route index element={<RoomsScheduleGrid/>}/> 
            </Route>    */}
            <Route path='/' element={<LoginPage/>}> 
                <Route path='login' element={<Login/>}/> 
            </Route>
        </Routes>
    );
};

export default AppRouter;
