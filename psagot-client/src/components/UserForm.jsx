import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/userModel.css";

const UserForm = ({ open = false, onClose = () => {}, user, onSave }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("שדה חובה"),
    email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
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
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: user?.password || "",
      status: user?.status || "",
      permission: user?.permission || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit} className="modal-container">
        <DialogTitle className="modal-header">
          {user ? "עריכת משתמש" : "הוספת משתמש"}
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className="modal-content">
            <Box className="row">
              <TextField
                label="שם"
                name="name"
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
              <TextField
                label="מייל"
                name="email"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
              <TextField
                label="טלפון"
                name="phone"
                variant="standard"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                fullWidth
              />
            </Box>

            {/* שורה שנייה - סיסמה, הרשאה, סטטוס */}
            <Box className="row">
              <TextField
                label="סיסמה"
                name="password"
                type="password"
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
              <FormControl variant="standard" fullWidth error={formik.touched.permission && Boolean(formik.errors.permission)}>
                <InputLabel>הרשאה</InputLabel>
                <Select
                  name="permission"
                  value={formik.values.permission}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="מנהל">מנהל</MenuItem>
                  <MenuItem value="משתמש רגיל">משתמש רגיל</MenuItem>
                </Select>
                {formik.touched.permission && formik.errors.permission && (
                  <Box sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>{formik.errors.permission}</Box>
                )}
              </FormControl>
              <FormControl variant="standard" fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                <InputLabel>סטטוס</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="פעיל">פעיל</MenuItem>
                  <MenuItem value="לא פעיל">לא פעיל</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <Box sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>{formik.errors.status}</Box>
                )}
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button variant="outlined" onClick={onClose}>ביטול</Button>
          <Button variant="contained" color="primary" type="submit">שמור</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;