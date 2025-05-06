import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomsPage from '../pages/RoomsPage';
import RoomSchedule from '../components/RoomsScheduleGrid';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}> 
                {/* <Route path='/' element={<RoomsPage/>}/> */}
                {/* <Route path='/' element={<RoomSchedule/>}/> */}
                <Route path='/' element={<RoomsScheduleSearch/>}/>
            </Route> 
         
             <Route path='/home' element={<Layout/>}>
                <Route index element={<HomePage/>}/>        
            </Route> 
                
            <Route path='/' element={<LoginPage/>}> 
                <Route path='login' element={<Login/>}/> 
            </Route>
        </Routes>
    );
};

export default AppRouter;