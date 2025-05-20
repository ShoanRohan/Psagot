import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import MeetingLocatorBar from '../pages/MeetingLocatorBar';
import LocatorBar from '../components/LocatorBar';
import MeetingTable from '../components/MeetingTable';





const AppRouter = () => {
    return (
        
        <Routes>
             <Route path='/' element={<Layout/>}></Route>
                <Route index element={<HomePage/>}></Route>
                <Route path='LocatorBar' element={<LocatorBar/>}></Route>
                <Route path='/components/MeetingLocatorBar' element={<MeetingLocatorBar/>}/>
                
                <Route path='/components/MeetingTable' element={<MeetingTable/>}/>   
                
       </Routes>  
           
    );}

export default AppRouter;