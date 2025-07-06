import React, { useEffect } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/AddAndUpdateUserPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction, updateUserAction } from "../features/user/userAction";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";

const AddAndUpdateUserPopUp = ({
  open = false,
  onClose = () => {},
  user,
}) => {
  const { userTypes } = useSelector((state) => state.userType);
  const currentUser = useSelector((state) => state.user?.user || null);
  const isNewUser = !user || !user.userId;
  const isAdmin = currentUser?.UserTypeName === "מנהל";
  const isEditingOther = currentUser?.userId !== user?.userId;
  const canEdite = isNewUser || (isAdmin && isEditingOther);
 const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllUserTypes());
  },[dispatch])
 

  const defaultUserTypeId =
    userTypes?.find((type) => type.name === "משתמש רגיל")?.userTypeId ?? 4;

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[א-תa-zA-Z\s]+$/, "השם יכול להכיל רק אותיות")
      .required("שדה חובה"),
    email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "מספר טלפון חייב להכיל 10 ספרות")
      .required("שדה חובה"),
    ...(user?.userId
      ? {}
      : {
          password: Yup.string()
            .min(6, "הסיסמה חייבת להכיל לפחות 6 תווים")
            .matches(/[A-Z]/, "הסיסמה חייבת לכלול לפחות אות גדולה אחת")
            .matches(/[0-9]/, "הסיסמה חייבת לכלול לפחות מספר אחד")
            .required("שדה חובה"),
        }),
    status: Yup.string().required("שדה חובה"),
    ...(canEdite && {userTypeName: Yup.string().required("שדה חובה")}),
  });

  const formik = useFormik({ 
    initialValues: {
      userId: user?.userId ?? 0,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: "", 
      isActive: user?.isActive ?? true,
      userTypeName: user?.userTypeName ?? "",
      userTypeId:
        user?.userTypeId !== undefined && user?.userTypeId !== null
          ? user.userTypeId
          : defaultUserTypeId,
      status: user ? (user.isActive ? "פעיל" : "לא פעיל") : "פעיל",
    },
    validationSchema,
    onSubmit: async (values) => { 
      console.log(values);
      const userTypeIdToSend =
    userTypes?.find((type) => type.name === values.userTypeName)?.userTypeId ?? 4;
      const userToSave = {
        ...values,
        isActive: values.status === "פעיל",
        userTypeId: userTypeIdToSend,
      };
      try {
        if (user?.userId) {
           await dispatch(updateUserAction(userToSave));
        } else {
           await dispatch(addUserAction(userToSave));
        }
        onClose();
      } catch (error) {
        console.error("שגיאה בשמירת המשתמש:", error);
      }
  },
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box component="form" onSubmit={formik.handleSubmit} className="modal-container">
        <DialogTitle className="modal-header">
          {user?.userId ? "עריכת משתמש" : "הוספת משתמש"}
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className="modal-content">
            <Box className="row">
              <TextField
                className="custom-input"
                label="שם"
                name="name"
                variant="standard"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
              <TextField
                className="custom-input"
                label="מייל"
                name="email"
                variant="standard"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
              <TextField
                className="custom-input"
                label="טלפון"
                name="phone"
                variant="standard"
                value={formik.values.phone || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                fullWidth
              />
            </Box>

            <Box className="row">
              {!user?.userId && (
                <TextField
                  className="custom-input"
                  label="סיסמה"
                  name="password"
                  type="password"
                  variant="standard"
                  value={formik.values.password || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  fullWidth
                />
              )}

              <FormControl variant="standard" fullWidth className="custom-input">
                <InputLabel>הרשאה</InputLabel>
                <Select
                  name="userTypeName"
                  value={formik.values.userTypeName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="custom-select"
                  disabled={!canEdite}
                >
                  {userTypes?.map((userType) => (
                    <MenuItem key={userType.userTypeId} value={userType.name}>
                      {userType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl component="fieldset" className="custom-input">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.status === "פעיל"}
                        onChange={(e) =>
                          formik.setFieldValue("status", e.target.checked ? "פעיל" : "לא פעיל")
                        }
                        disabled={!canEdite}
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
          <Button className="modal-button" variant="outlined" onClick={onClose}>
            ביטול
          </Button>
          <Button className="modal-button" variant="contained" color="primary" type="submit" >
            שמור
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddAndUpdateUserPopUp;
