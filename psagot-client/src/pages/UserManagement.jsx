import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import UserGrid from '../components/UserGrid';
import circlePlus from '../assets/icons/circle-plus.png';
import exptExsel from '../assets/icons/image 6.png';

const UserManagement = () => {
  return (
    <Box sx={{
      width: '85vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      position: 'relative',
    }}>
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          width: '9.48%',
          height: '4.35%',
          top: '7.5%',
          left: '88%',
          transform: 'translateX(-50%)',
          fontFamily: 'Rubik',
          fontWeight: 700,
          fontSize: '4.5vh',
          lineHeight: '100%',
          textAlign: 'right',
          color: '#112B83',
          textTransform: 'capitalize',
        }}
      >
        משתמשים
      </Typography>

      <Button
        sx={{
          position: 'absolute',
          width: '2.5rem',
          height: '2.5rem',
          top: '7.78%',
          left: '16%',
          borderRadius: '0.68vh',
          padding: '0.2rem',
          backgroundColor: '#F0F1F3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '2.5rem',
          minHeight: '2.5rem'
        }}
      >
        <img
          src={exptExsel}
          alt="אייקון ייצוא לאקסל"
          style={{ width: '75%', height: '80%' }}
        />
      </Button>

      <Button
        variant="contained"
        sx={{
          position: 'absolute',
          width: '9.5rem',
          height: '2.5rem',
          top: '7.78%',
          left: '3.5%',
          borderRadius: '50vh',
          padding: '0 1.3%',
          gap: '0.5vw',
          backgroundColor: '#326DEF',
          display: 'flex',
          alignItems: 'center',
          minWidth:'9.5rem',
          minHeight: 'rem'
        }}
      >
        <img
          src={circlePlus}
          alt="אייקון הוספת משתמש"
          style={{ width: '0.76vw', height: '1.8vh' }}
        />
        <Typography
          sx={{
            fontFamily: 'Rubik',
            fontWeight: 400,
            fontSize: '1.8vh',
            lineHeight: '100%',
            textAlign: 'center',
            color: '#FFFFFF',
            textTransform: 'capitalize',
          }}
        >
          הוספת משתמש
        </Typography>
      </Button>

      <UserGrid />
    </Box>
  );
};

export default UserManagement;