import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import MeetingLocatorBar from '../pages/MeetingLocatorBar';
import LocatorBar from '../components/LocatorBar';



import MeetingLocatorBar from '../pages/MeetingLocatorBar';

const AppRouter = () => {
    return (
        
        <Routes>  
             <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>  
                <Route path='LocatorBar' element={<LocatorBar/>}/>
               
               
               
                <Route path='MeetingLocatorBar' element={<MeetingLocatorBar/>}/>
            </Route> 
                
            <Route path='/' element={<LoginPage/>}> 
                <Route path='login' element={<Login/>}/> 
            </Route>
        </Routes>
    );
};

export default AppRouter;