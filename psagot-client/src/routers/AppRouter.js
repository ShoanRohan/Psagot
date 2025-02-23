import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';

const AppRouter = () => {
    return (

        <Routes>  
             <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>    
            </Route> 
                
            <Route path='/login' element={<LoginPage/>}> 
                <Route path='' element={<Login/>}/> 
            </Route>
           
        </Routes>
    );
};

export default AppRouter;