import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/userModel.css";
import { useDispatch, useSelector } from "react-redux";

const AddUserPopUp = ({ open = false, onClose = () => {}, user, onSave }) => {
  const { userTypes, status, error } = useSelector((state) => state.userType);
  const IsEdit = user && user.userId ? true : false;
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[א-תa-zA-Z\s]+$/, "השם יכול להכיל רק אותיות")
      .required("שדה חובה"),
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
      userId: user?.userId ?? 0,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: user?.password ?? "",
      isActive: user?.isActive ?? false,
      userTypeId: user?.userTypeId ?? -1,
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
      <Box component="form" onSubmit={formik.handleSubmit} className="modal-container">
        <DialogTitle className="modal-header">
          {IsEdit ? "עריכת משתמש" : "הוספת משתמש"}
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
                  {userTypes?.map((userType) => (
                    <MenuItem key={userType.id} value={userType.id}>
                      {userType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl component="fieldset">
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox
          checked={formik.values.status === "פעיל"}
          onChange={(e) => 
            formik.setFieldValue("status", e.target.checked ? "פעיל" : "לא פעיל")
          }
        />
      }
      label="פעיל"
    />
  </FormGroup>
</FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button variant="outlined" onClick={onClose}>ביטול</Button>
          <Button variant="contained" color="primary" type="submit">שמור</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddUserPopUp;
