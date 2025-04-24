import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomDetails from '../components/RoomDetails';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';

const AppRouter = () => {
    return (
        
        <Routes>  
             <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/> 
                <Route path='/room' element={<RoomDetails />} />
                <Route path='/roomSearch' element={<RoomsScheduleSearch />} />   
            </Route> 
                
            <Route path='/' element={<LoginPage/>}> 
                <Route path='login' element={<Login />} /> 
            </Route>
        </Routes>
    );
};

export default AppRouter;
