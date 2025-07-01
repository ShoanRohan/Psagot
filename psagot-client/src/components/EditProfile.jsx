import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../styles/UpdateUser.css";

const EditProfile = ({ user, onSave, onClose }) => {
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
  },
  validationSchema,
  onSubmit: (values) => {
    onSave(values);
    if (onClose) onClose();
  },
  validateOnBlur: true,
  validateOnChange: true,
});

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h5" mb={3} align="center">
        עריכת פרופיל
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="שם"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="אימייל"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="טלפון"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="סיסמה"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="סטטוס"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="active">פעיל</MenuItem>
            <MenuItem value="inactive">לא פעיל</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="הרשאה"
            name="permission"
            value={formik.values.permission}
            onChange={formik.handleChange}
            error={formik.touched.permission && Boolean(formik.errors.permission)}
            helperText={formik.touched.permission && formik.errors.permission}
          >
            <MenuItem value="admin">מנהל</MenuItem>
            <MenuItem value="user">משתמש</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            ביטול
          </Button>
          <Button type="submit" variant="contained" color="primary">
            שמור
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;