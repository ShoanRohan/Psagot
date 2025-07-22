import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { updateUserAction, fetchUserById } from '../features/user/userAction';

import { fetchAllUserTypes } from '../features/userType/userTypeActions';
const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
 

  // Redux state
  const { selectedUser,  status, error,currentUser } = useSelector((state) => state.user);
   const { userTypes } = useSelector((state) => state.userType);
  //  const { currentUser } = useSelector((state) => state.auth); // נניח שיש auth state
  // Local state
  const [isEditing, setIsEditing] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');
   const [returnPath, setReturnPath] = useState('/users');
  const [formData, setFormData] = useState({
    userId: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    userTypeId: '',
    userTypeName: '',
    isActive: true,
    role: ''
  });

  const [validationErrors, setValidationErrors] = useState({});


  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
      dispatch(fetchAllUserTypes());
    }
  }, [dispatch, userId]); // הסר selectedUser מה-dependency array

  useEffect(() => {
  
    if  (selectedUser && selectedUser?.userId === parseInt(userId) ) {
       const userType = userTypes.find(type => type.userTypeId === selectedUser.userTypeId)
  
       setFormData({
        userId: selectedUser.userId || 0,
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        phone: selectedUser.phone || '',
        password: '',
        userTypeId: selectedUser.userTypeId || userType?.userTypeId || '',
        userTypeName: selectedUser.userTypeName || userType?.name|| '',
        isActive: selectedUser.isActive !== undefined ? selectedUser.isActive : true,
      });
    }
  }, [selectedUser, userId ]); // הוסף userId לבדיקה
//   useEffect(() => {
//    const referrer = document.referrer;
//   if (referrer.includes('/users')) {
//     setReturnPath('/users');
//   } else {
//     setReturnPath('/');
//   }
// }, []);
        //שינוי ערך שדה
    const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'userTypeName' &&  currentUser & currentUser?.role !== 'admin' && 
      currentUser?.userId === formData.userId) {
    return; // לא מאפשר שינוי
  }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

 
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  // הוסף פונקציה לבדיקת טלפון ישראלי
const validatePhoneNumber = (phone) => {
  // הסר רווחים ומקפים
  const cleanPhone = phone.replace(/[\s-]/g, '');
  const israeliPhoneRegex = /^(\+972|972|0)?(5[0-9]|7[2-9]|2|3|4|8|9)[0-9]{7}$/;
  return israeliPhoneRegex.test(cleanPhone);
};
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};
const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: true, message: '' }; // סיסמה ריקה מותרת (תשתמש במקורית)
  }
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (password.length < minLength) {
    return { isValid: false, message: `הסיסמה חייבת להכיל לפחות ${minLength} תווים` };
  }
  
  if (!hasUpperCase) {
    return { isValid: false, message: 'הסיסמה חייבת להכיל לפחות אות גדולה אחת' };
  }
  
  if (!hasLowerCase) {
    return { isValid: false, message: 'הסיסמה חייבת להכיל לפחות אות קטנה אחת' };
  }
  
  if (!hasNumbers) {
    return { isValid: false, message: 'הסיסמה חייבת להכיל לפחות ספרה אחת' };
  }
  
  if (!hasSpecialChar) {
    return { isValid: false, message: 'הסיסמה חייבת להכיל לפחות תו מיוחד אחד' };
  }
  
  return { isValid: true, message: '' };
};

  //בדיקת תקינות
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'שם הוא שדה חובה';
    }

    if (!formData.email.trim()) {
      errors.email = 'אימייל הוא שדה חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'פורמט אימייל לא תקין';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'טלפון הוא שדה חובה';
    }
       else if(!validatePhoneNumber(formData.phone)) {
    errors.phone = 'מספר טלפון לא תקין (נדרש מספר ישראלי)';
  }
    
    if (!formData.userTypeName) {
      errors.userTypeName = 'סוג משתמש הוא שדה חובה';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

//  שמירה
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {

    const userType = userTypes.find(type => type.name === formData.userTypeName)
    const password = formData.password ? formData.password : selectedUser?.password;
    // setFormData(prev => ({
    //   ...prev,
    //   userTypeId: 2 || '',
    // }));
  const fromD ={...formData, userTypeId: userType?.userTypeId || '',password: password };

  const { userTypeName, ...rest } = fromD;
  
     dispatch(updateUserAction(fromD));
    setSuccessMessage('המשתמש עודכן בהצלחה');
    // setTimeout(() => {
       navigate(returnPath);
       
    // }, 2000);
  } catch (error) {
  
  }
};
{successMessage && (
  <Alert severity="success" sx={{ mb: 2 }}>
    {successMessage}
  </Alert>
)};
 // עריכה
  const handleEdit = () => {
    setIsEditing(true);
  };
  //ביטול
  const handleCancel = () => {
      setIsEditing(false);
      navigate(returnPath);
   
    if (selectedUser) {
      setFormData({
        userId: selectedUser.userId || 0,
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        phone: selectedUser.phone || '',
        password: '',
        userTypeId: selectedUser.userTypeId || '',
        userTypeName: selectedUser.userTypeName || '',
        isActive: selectedUser.isActive !== undefined ? selectedUser.isActive : true,
        role: selectedUser.role || ''
      });
    }
    setValidationErrors({});
  };
  if (!userId) {
    navigate('/user');
    return null;
  }
  if (status === 'loading') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>טוען...</Typography>
      </Box>
    );
  }
 return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        עריכת משתמש
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

              
      <Card elevation={3}>
        <CardContent>
          {/* Action Buttons - Right side */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                size="large"
              >
                עריכה
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={status === 'loading'}
                  size="large"
                >
                  שמירה
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  size="large"
                >
                  ביטול
                </Button>
              </Box>
            )}
          </Box>

          {/* Personal Details Header */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, textAlign: 'right' }}>
            פרטים אישיים
          </Typography>
          
          <Divider sx={{ mb: 3 }} />

         
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '100%', maxWidth: 700 }}>
              <Grid container spacing={3} direction="row">
                {/* Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="שם מלא"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                    variant="outlined"
                    InputLabelProps={{
                      style: { left: 14, right: 'auto', transformOrigin: 'top left' }
                    }}
                    InputProps={{
                      style: { textAlign: 'left', direction: 'ltr' }
                    }}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="אימייל"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    variant="outlined"
                    InputLabelProps={{
                      style: { left: 14, right: 'auto', transformOrigin: 'top left' }
                    }}
                    InputProps={{
                      style: { textAlign: 'left', direction: 'ltr' }
                    }}
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="טלפון"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={!!validationErrors.phone}
                    helperText={validationErrors.phone}
                    variant="outlined"
                    InputLabelProps={{
                      style: { left: 14, right: 'auto', transformOrigin: 'top left' }
                    }}
                    InputProps={{
                      style: { textAlign: 'left', direction: 'ltr' }
                    }}
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="סיסמה חדשה (אופציונלי)"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    helperText="השאר ריק אם לא רוצה לשנות"
                    variant="outlined"
                    InputLabelProps={{
                      style: { left: 14, right: 'auto', transformOrigin: 'top left' }
                    }}
                    InputProps={{
                      style: { textAlign: 'left', direction: 'ltr' }
                    }}
                  />
                </Grid>

                {/* User Type */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!validationErrors.userTypeName}>
                    <InputLabel 
                      sx={{ 
                        left: 14, 
                        right: 'auto', 
                        transformOrigin: 'top left',
                        '&.Mui-focused': {
                          left: 14,
                          right: 'auto'
                        },
                        '&.MuiInputLabel-shrink': {
                          left: 14,
                          right: 'auto'
                        }
                      }}
                    >
                      סוג משתמש
                    </InputLabel><Select
  name="userTypeName"
  value={formData.userTypeName}
  onChange={handleInputChange}
  disabled={!isEditing || (currentUser?.role !== 'admin' && currentUser?.userId === formData.userId)}
  label="סוג משתמש"
  sx={{
    textAlign: 'left',
    direction: 'ltr',
    '& .MuiSelect-select': {
      textAlign: 'left',
      direction: 'ltr'
    }
  }}
>
  {userTypes.map((userType) => (
    <MenuItem key={userType.userTypeId} value={userType.name}>
      {userType.name}
    </MenuItem>
  ))}
</Select>

                    {validationErrors.userTypeName && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, textAlign: 'left' }}>
                        {validationErrors.userTypeName}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          name="isActive"
                          disabled={!isEditing}
                        />
                      }
                      label="משתמש פעיל"
                      labelPlacement="end"
                      sx={{ 
                        direction: 'ltr',
                        '& .MuiFormControlLabel-label': {
                          marginLeft: 1,
                          marginRight: 0
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};


export default UpdateUser; 