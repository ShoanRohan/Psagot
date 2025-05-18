import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import MeetingLocatorBar from '../pages/MeetingLocatorBar';
import LocatorBar from '../components/LocatorBar';





const AppRouter = () => {
    return (
        
        <Routes>  
             <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>  
                <Route path='LocatorBar' element={<LocatorBar/>}/>
               
               
               
                <Route path='MeetingLocatorBar' element={<MeetingLocatorBar/>}/>
            </Route> 
                
          
           
        </Routes>
    );
};

export default AppRouter;