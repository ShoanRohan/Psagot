// import React, { useState, useEffect } from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { useTheme } from '@mui/material/styles';
// import {
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Typography,
//   Box,
//   Grid,
//   Alert,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// export const Register = () => {
//   const theme = useTheme();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     userTypeId: 500,
//     isActive: true,
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'name':
//         return /^[a-zA-Z\u0590-\u05FF ]+$/.test(value) ? '' : "Name must contain only letters";
//       case 'email':
//         return /^\S+@\S+\.\S+$/.test(value) ? '' : "Invalid email address";
//       case 'phone':
//         return /^\d{9,10}$/.test(value) ? '' : "Phone number must be 9-10 digits";
//       case 'password':
//         return value.length >= 6 ? '' : "Password must be at least 6 characters";
//       case 'confirmPassword':
//         return value === formData.password ? '' : "Passwords do not match";
//       default:
//         return '';
//     }
//   };

//   useEffect(() => {
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (touched[key]) {
//         newErrors[key] = validateField(key, formData[key]);
//       }
//     });

//     setErrors(newErrors);
//     setIsFormValid(Object.values(newErrors).every((err) => err === '') && Object.values(formData).every(val => val !== ''));
//   }, [formData, touched]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: validateField(name, value),
//     }));
//   };

//   const handleTogglePassword = (field) => {
//     setShowPassword((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   const handleRegister = async () => {
//     setError('');
//     setSuccess('');

//     if (!isFormValid) return;

//     try {
//       const response = await fetch('https://your-server-url/AddUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSuccess('Registration successful!');
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           password: '',
//           confirmPassword: '',
//           userTypeId: 500,
//           isActive: true,
//         });
//         setTouched({});
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Registration failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please check your connection.');
//     }
//   };

//   return (
//     <AppProvider>
//       <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
//         <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>Register</Typography>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//         <Grid container spacing={2}>
//           {['name', 'email', 'phone'].map((field) => (
//             <Grid item xs={12} key={field}>
//               <TextField
//                 fullWidth
//                 label={field.charAt(0).toUpperCase() + field.slice(1)}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched[field] && !!errors[field]}
//                 helperText={touched[field] && errors[field]}
//               />
//             </Grid>
//           ))}

//           {['password', 'confirmPassword'].map((field) => (
//             <Grid item xs={12} key={field}>
//               <TextField
//                 fullWidth
//                 label={field === 'confirmPassword' ? 'Confirm Password' : 'Password'}
//                 name={field}
//                 type={showPassword[field] ? 'text' : 'password'}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched[field] && !!errors[field]}
//                 helperText={touched[field] && errors[field]}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => handleTogglePassword(field)} edge="end">
//                         {showPassword[field] ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           ))}

//           <Grid item xs={12}>
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={handleRegister}
//               disabled={!isFormValid}
//             >
//               Register
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </AppProvider>
//   );
// };


