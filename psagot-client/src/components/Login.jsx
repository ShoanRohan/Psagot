import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';

// פונקציית התחברות
const signIn = async (provider, formData) => {
  try {
    const response = await api.post('/auth/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return { success: true };
    } else {
      return { success: false, error: 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred. Please try again.' };
  }
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'transparent',
          direction: 'rtl',
        }}
      >
        {/* כותרת */}
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold', 
            color: '#333', 
            fontFamily: 'Rubik'  // ✅ פונט Rubik
          }}
        >
          כניסה למערכת
        </Typography>

        {/* טופס התחברות */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            signIn('credentials', new FormData(e.currentTarget));
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '300px',
          }}
        >
          <TextField
            label="אימייל"
            name="email"
            variant="standard"
            fullWidth
            InputLabelProps={{ shrink: true }} 
            
          />
          <TextField
            label="סיסמה"
            name="password"
            type="password"
            variant="standard"
            fullWidth
            InputLabelProps={{ shrink: true, }} 
           
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '25px',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            כניסה למערכת
          </Button>
        </Box>

        {/* כפתור הרשמה */}
        <Button
          variant="text"
          sx={{
            mt: 2,
            color: '#1976d2',
            textDecoration: 'underline',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = '/register'}
        >
          אין לך חשבון? תרשם
        </Button>
      </Box>
    </AppProvider>
  );
}
