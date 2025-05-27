import * as React from 'react';
import EyeIcon from '../assets/icons/eye_icon.svg';
import { Box, Button, Typography, TextField, Link, IconButton, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';

const signIn = async (formData, setError) => {
  try {
    const response = await api.post('/auth/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return { success: true };
    } else {
      setError('התחברות נכשלה, אנא בדוק את הפרטים.');
      return { success: false };
    }
  } catch (error) {
    setError('אירעה שגיאה, נסה שוב מאוחר יותר.');
    return { success: false };
  }
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'שדה חובה';
    if (!emailRegex.test(value)) return 'אימייל לא תקין';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'שדה חובה';
    if (value.length < 6) return 'סיסמה חייבת להיות לפחות 6 תווים';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const result = await signIn(formData, setFormError);
    if (!result.success) {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        direction: 'rtl',
        fontFamily: 'Rubik',
        marginTop: '-3vh',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'Rubik',
          fontSize: '25px',
        }}
      >
        כניסה למערכת
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          height: '100%',
          fontFamily: 'Rubik',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '53%',
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <TextField
              label="שם משתמש"
              name="email"
              variant="standard"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailError(validateEmail(email))}
              error={!!emailError}
              helperText={emailError}
              sx={{
                '& .MuiInputLabel-root': {
                  textAlign: 'right',
                  width: '100%',
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                },
              }}
            />

            <TextField
              label="סיסמה"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordError(validatePassword(password))}
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                '& .MuiInputLabel-root': {
                  textAlign: 'right',
                  width: '100%',
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      <img
                        src={EyeIcon}
                        alt="Eye Icon"
                        style={{ width: '20px', height: '20px' }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '4%',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/forgot-password"
              sx={{
                fontSize: '12px',
                color: '#6F6F6F',
                cursor: 'pointer',
                textDecoration: 'none',
                fontFamily: 'Rubik',
              }}
            >
              שכחתי סיסמה
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '99%',
            height: '27%',
            gap: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={
              isSubmitting ||
              !email ||
              !password ||
              emailError ||
              passwordError
            }
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '25px',
              py: 1,
              fontSize: '14px',
              width: '60%',
              height: '48%',
              fontSize: '12px',
              fontFamily: 'Rubik',
              '&:hover': {
                backgroundColor: '#112B83',
              },
            }}
          >
            {isSubmitting ? 'מתחבר...' : 'כניסה למערכת'}
          </Button>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '4%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="text"
              sx={{
                color: '#6F6F6F',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'Rubik',
                fontSize: '12px',
              }}
              onClick={() => (window.location.href = '/register')}
            >
              אין לך חשבון?{' '}
              <span
                style={{
                  borderBottom: '1px solid #6F6F6F',
                  display: 'inline-block',
                  lineHeight: '1',
                }}
              >
                הירשם
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}