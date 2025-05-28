import React, { useState, useEffect } from 'react';
import EyeIcon from '../assets/icons/eye_icon.svg';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signUp } from '../utils/api';
import { useDispatch } from 'react-redux';
import { addUserAction } from '../features/user/userAction';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/user/userSlice';

const Register = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [nameError, setnameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validateConfirmPassword = (value) => {
    if (value !== password) return 'הסיסמאות אינן תואמות';
    return '';
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!value) return 'שדה חובה';
    if (!phoneRegex.test(value)) return 'מספר טלפון לא תקין';
    return '';
  };

  const validatename = (value) => {
    if (!value) return 'שדה חובה';
    if (value.length < 3) return 'שם משתמש חייב להיות לפחות 3 תווים';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);
  
    const nameValidation = validatename(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword);
    const phoneValidation = validatePhone(phone);
  
    setnameError(nameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);
    setPhoneError(phoneValidation);
  
    if (
      nameValidation ||
      emailValidation ||
      passwordValidation ||
      confirmPasswordValidation ||
      phoneValidation
    ) {
      setIsSubmitting(false);
      return;
    }
  try {
  const resultAction = await dispatch(addUserAction({
    name,
    email,
    phone,
    password,
    isActive: true,
    userTypeId: 5,
  }));
console.log('Result action:', resultAction);
const registeredUser = resultAction.payload.user;
  if (addUserAction.fulfilled.match(resultAction)) {
  const userId = registeredUser?.userId || registeredUser?.id;
  if (userId) {
    localStorage.setItem('userId', userId);
  dispatch(setUser(registeredUser));
  alert("נרשמת בהצלחה!");
  navigate('/');}
} else {
  const error = resultAction.payload;
  if (error?.errorCode === 'EMAIL_PHONE_EXISTS') {
    alert("כבר קיים משתמש עם האימייל והטלפון שהזנו.");
  } else {
    alert("אירעה שגיאה בהרשמה. נסי שוב.");
  }}
} catch (error) {
  console.error('שגיאה בלתי צפויה:', error);
  alert("שגיאה בלתי צפויה. נסי שוב.");
} finally {
  setIsSubmitting(false);
}
};
  
    return (
        <>
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
                    marginTop: '-10vh',
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
                        marginTop: '5vh',
                        marginBottom: '5vh'
                    }}
                >
                    הרשמה למערכת
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
                        marginTop: "-3vh",
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
                                name="name"
                                variant="standard"
                                fullWidth
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                onBlur={() => setnameError(validatename(name))}
                                error={!!nameError}
                                helperText={nameError}
                                InputLabelProps={{
                                    style: {
                                        textAlign: 'right',
                                        width: '100%',
                                        fontFamily: 'Rubik',
                                        fontSize: '16px',
                                    },
                                }}
                            />

                            <TextField
                                label="מייל "
                                name="email"
                                variant="standard"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setEmailError(validateEmail(email))}
                                error={!!emailError}
                                helperText={emailError}
                                InputLabelProps={{
                                    style: {
                                        textAlign: 'right',
                                        width: '100%',
                                        fontFamily: 'Rubik',
                                        fontSize: '16px',
                                    },
                                }}
                            />
                            <TextField
                                label="טלפון"
                                name="phone"
                                variant="standard"
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={() => setPhoneError(validatePhone(phone))}
                                error={!!phoneError}
                                helperText={phoneError}
                                InputLabelProps={{
                                    style: {
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
                                InputLabelProps={{
                                    style: {
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
                                                {showPassword ? (
                                                    <img
                                                        src={EyeIcon}
                                                        alt="Eye Icon"
                                                        style={{ width: '20px', height: '20px' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={EyeIcon}
                                                        alt="Eye Icon"
                                                        style={{ width: '20px', height: '20px' }}
                                                    />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="אימות סיסמה"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                variant="standard"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => setConfirmPasswordError(validateConfirmPassword(confirmPassword))}
                                error={!!confirmPasswordError}
                                helperText={confirmPasswordError}
                                InputLabelProps={{
                                    style: {
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
                                                aria-label="Toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? (
                                                    <img
                                                        src={EyeIcon}
                                                        alt="Eye Icon"
                                                        style={{ width: '20px', height: '20px' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={EyeIcon}
                                                        alt="Eye Icon"
                                                        style={{ width: '20px', height: '20px' }}
                                                    />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
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
                        <Box sx={{ height: '10px' }} />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={
                                isSubmitting ||
                                !email ||
                                !password ||
                                !confirmPassword ||
                                !!emailError ||
                                !!passwordError ||
                                !!confirmPasswordError
                            }
                            sx={{
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: '25px',
                                py: 1,
                                width: '60%',
                                height: '48%',
                                fontSize: '12px',
                                fontFamily: 'Rubik',
                                '&:hover': {
                                    backgroundColor: '#112B83',
                                },
                                marginTop: 6,
                            }}
                        >
                            {isSubmitting ? 'נרשם...' : 'הרשמה למערכת'}
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
                                    textDecoration: 'underline',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontFamily: 'Rubik',
                                    fontSize: '12px',
                                }}
                                onClick={() => (window.location.href = '/login')}
                            >
                                כבר יש לך חשבון? התחבר
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
  
export default Register;

