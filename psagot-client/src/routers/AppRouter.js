import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../components/Login'; 
import LoginPage from '../pages/LoginPage';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import HomePage from '../pages/HomePage';
import RoomsSearch from '../components/RoomsSearch';



const AppRouter = () => {
    return (
        
        <Routes>  
           

           <Route path="/" element={<RoomsSearch />} />  {/* זה יטען כברירת מחדל */}

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
