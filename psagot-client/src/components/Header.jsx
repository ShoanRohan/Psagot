import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();


  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App Psagot
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit" onClick={() => {navigate('/Register')}}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
