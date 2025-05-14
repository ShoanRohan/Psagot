import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Section = () => {
    return (
        <Box><Outlet /></Box>
    );
};

export default Section;
