import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../features/user/userAction';

const EditProfile = () => {
  const { selectedUser: user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSave = (values) => {
    dispatch(updateUserAction(values));
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[א-תa-zA-Z\s]+$/, "שם יכול להכיל רק אותיות")
      .required("שדה חובה"),
    email: Yup.string()
      .email("אימייל לא תקין")
      .required("שדה חובה"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "מספר טלפון חייב להכיל 10 ספרות")
      .required("שדה חובה"),
    password: Yup.string()
      .min(6, "הסיסמה חייבת להכיל לפחות 6 תווים")
      .matches(/[A-Z]/, "הסיסמה חייבת לכלול לפחות אות גדולה אחת")
      .matches(/[0-9]/, "הסיסמה חייבת לכלול לפחות מספר אחד")
      .required("שדה חובה"),
    status: Yup.string().required("שדה חובה"),
    permission: Yup.string().required("שדה חובה"),
  });

  const formik = useFormik({
    initialValues: {
      userId: user?.userId ?? 0,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: "",
      status: user?.status ?? "active",
      permission: user?.permission ?? "user",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      navigate(-1);
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <Box>
      <Box className="header-container">
        <Typography variant="h1" className="center-title">
          עידכון משתמש
        </Typography>
        <Box className="buttons-container">
          <Button variant="outlined" className="outlined" onClick={() => navigate(-1)}>
            ביטול
          </Button>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit}>
            שמור
          </Button>
        </Box>
      </Box>

      <Box className="edit-form">
        <Typography variant="h6" className="form-title">
          פרטים אישיים
        </Typography>

        <Grid
          container
          className="container"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
          wrap="wrap"
          direction="row"
        >
          <Grid item>
            <TextField
              variant="standard"
              label="שם"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              fullWidth={false}
              sx={{ minWidth: 150 }}
            />
          </Grid>

          <Grid item>
            <TextField
              variant="standard"
              label="אימייל"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              fullWidth={false}
              sx={{ minWidth: 200 }}
            />
          </Grid>

          <Grid item>
            <TextField
              variant="standard"
              label="טלפון"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              fullWidth={false}
              sx={{ minWidth: 130 }}
            />
          </Grid>

          <Grid item>
            <TextField
              variant="standard"
              type="password"
              label="סיסמה"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              fullWidth={false}
              sx={{ minWidth: 150 }}
            />
          </Grid>

          <Grid item>
            <TextField
              select
              variant="standard"
              label="סטטוס"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              fullWidth={false}
              sx={{ minWidth: 100 }}
              disabled
            >
              <MenuItem value="active">פעיל</MenuItem>
              <MenuItem value="inactive">לא פעיל</MenuItem>
            </TextField>
          </Grid>

          <Grid item>
            <TextField
              select
              variant="standard"
              label="הרשאה"
              name="permission"
              value={formik.values.permission}
              onChange={formik.handleChange}
              error={formik.touched.permission && Boolean(formik.errors.permission)}
              fullWidth={false}
              sx={{ minWidth: 100 }}
              disabled
            >
              <MenuItem value="admin">מנהל</MenuItem>
              <MenuItem value="user">משתמש</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProfile;
