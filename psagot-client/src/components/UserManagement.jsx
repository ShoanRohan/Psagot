import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import UserGrid from './UserGrid';
import circlePlus from '../assets/icons/circle-plus.png';
import exptExsel from '../assets/icons/image 6.png';

const UserManagement = () => {
  return (
    <Box sx={{
      width: '100vw',
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
          width: { xs: '150px', sm: '7.5%', md: '182px' },
          height: '47px',
          top: { xs: '40px', sm: '60px', md: '81px' },
          left: { xs: '71%', sm: '71%', md: '1377px' },
          transform: 'translateX(-50%)',
          fontFamily: 'Rubik',
          fontWeight: 700,
          fontSize: { xs: '6.64px', sm: '12.5px', md: '40px' },
          lineHeight: '100%',
          textAlign: 'right',
          color: '#112B83',
          textTransform: 'capitalize',
        }}
      >
        משתמשים
      </Typography>
      

      {/* כפתור יצוא לאקסל */}
      <Button
        sx={{
          position: 'absolute',
          width: { xs: '40px', sm: '42px', md: '44px' },
          height: { xs: '40px', sm: '42px', md: '44px' },
          top: { xs: '70px', sm: '78px', md: '84px' },
          left: { xs: '15px', sm: '50px', md: '266px' },
          borderRadius: '6.88px',
          padding: '6.88px 8px',
          backgroundColor: '#F0F1F3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={exptExsel}
          alt="אייקון ייצוא לאקסל"
          style={{ width: '29px', height: '29px' }}
        />
      </Button>

      {/* כפתור הוספת משתמש */}
      <Button
        variant="contained"
        sx={{
          position: 'absolute',
          width: { xs: '140px', sm: '155px', md: '171px' },
          height: { xs: '40px', sm: '42px', md: '44px' },
          top: { xs: '70px', sm: '78px', md: '84px' },
          left: { xs: '60px', sm: '90px', md: '79px' },
          borderRadius: '50px',
          padding: '0 24px',
          gap: '8px',
          backgroundColor: '#326DEF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={circlePlus}
          alt="אייקון הוספת משתמש"
          style={{ width: '14px', height: '14px' }}
        />
        <Typography
          sx={{
            fontFamily: 'Rubik',
            fontWeight: 400,
            fontSize: { xs: '14px', sm: '15px', md: '16px' },
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
