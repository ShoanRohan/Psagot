import * as React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const RoomsScheduleSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        mt: 5,
        mb: 1,
        mx: 'auto',
        width: '90%',
        maxWidth: 1000,
      }}
    >
      <AppBar
        position="static"
        color="white"
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          height: isMobile ? '9vh' : '12vh', 
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: isMobile ? 1 : 2,
            paddingX: isMobile ? 1 : 3,
            minHeight: '100%', 
          }}
        >
          <Button
            sx={{
              color: 'black',
              fontSize: isMobile ? '0.7rem' : isTablet ? '0.85rem' : '1rem',
              minWidth: isMobile ? 60 : 90,
            }}
          >
            יום קודם
          </Button>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                format="DD/MM/YYYY"
                sx={{
                  
                  '& .MuiInputBase-root': {
                    padding: isMobile ? '2px' : '6px',
                    fontSize: isMobile ? '0.8rem' : '1rem',
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Button
            sx={{
              color: 'black',
              fontSize: isMobile ? '0.7rem' : isTablet ? '0.85rem' : '1rem',
              minWidth: isMobile ? 60 : 90,
            }}
          >
            יום הבא
          </Button>

          <Button
            sx={{
              color: 'black',
              fontSize: isMobile ? '0.7rem' : isTablet ? '0.85rem' : '1rem',
              minWidth: isMobile ? 60 : 90,
            }}
          >
            היום
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default RoomsScheduleSearch;
