import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomsGrid from '../components/RoomsGrid';

const AppRouter = () => {
    return (
        
        <Routes>  
             <Route path='/home' element={<Layout/>}>
                <Route index element={<HomePage/>}/>    
            </Route> 
                
            {/* <Route path='/' element={<LoginPage/>}> 
                <Route path='login' element={<Login/>}/> 
            </Route> */}

            <Route path='/' element={<RoomsGrid/>}>
            </Route>
        </Routes>
    );
};

export default AppRouter;
