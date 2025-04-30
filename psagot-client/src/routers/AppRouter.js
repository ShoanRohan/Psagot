import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import AddMeeting from '../pages/AddMeeting';
import MeetingButton from '../pages/MeetingButton';
import { ExportIconButton } from '../pages/ExcelButton';
const AppRouter = () => {
    return (
        <Routes>        
            <Route path='/' element={<Layout/>}>  
                <Route index element={<HomePage/>}/>
                
                <Route path='add-meeting' element={<AddMeeting />} />
                <Route path='export-excel' element={< ExportIconButton />} />

            </Route>
        </Routes>
    );
};

export default AppRouter;
