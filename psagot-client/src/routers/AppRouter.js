import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import AddMeeting from '../pages/AddMeeting';
import { ExportIconButton } from '../pages/ExportIconButton';
import MeetingTable from '../components/MeetingTable';
import MeetingPage from '../pages/MeetingPage';

const AppRouter = () => {
    return (
        <Routes>        
                <Route path='/' element={<Layout/>}>  
                <Route index element={<HomePage/>}/>
                <Route path='add-meeting' element={<AddMeeting />} />
                <Route path='export-excel' element={< ExportIconButton />} />
                <Route path='pages/MeetingPage' element={<MeetingPage/>}/>
                </Route>

        </Routes>
    );
};

export default AppRouter;
