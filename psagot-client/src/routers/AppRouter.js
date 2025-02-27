import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import UsersTable from '../pages/UsersTable';
import EditUser from '../pages/EditUser';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/users' element={<UsersTable/>}/>
                <Route
                    path='/edit-user/:id' element={<EditUser/>}/>
                      {/* element={useRole === "Manager" ? <EditUser/> : <Navigate to="/" />} */}
                
            </Route>
        </Routes>
    );
};

export default AppRouter;