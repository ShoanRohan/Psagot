import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { addUserAction } from "../features/user/userAction";

const statusOptions = [{id:0, text:"פעיל", sent:true}, {id:1, text:"לא פעיל" , sent:false}];


export default function AddUser({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    isActive: ""
  });
  const {userTypes}=useSelector(state=>state.userType)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchAllUserTypes())
  },[])

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const roleObject = form.role
    const { role, ...rest } = form;
    const updatedForm = {...rest, userTypeId: roleObject.userTypeId,userTypeName: roleObject.name};
    setForm(updatedForm);
    dispatch(addUserAction(updatedForm));
    console.log("נשלח:", updatedForm);
    onClose();
  };



  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">הוספת משתמש</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="שם" fullWidth value={form.name} onChange={handleChange("name")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="מייל" fullWidth value={form.email} onChange={handleChange("email")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="סיסמה" fullWidth type="password" value={form.password} onChange={handleChange("password")} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="הרשאה"
              select
              fullWidth
              value={form.role}
              onChange={handleChange("role")}
            >
              {userTypes.map((role) => (
                <MenuItem key={role.userTypeId} value={role}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="סטטוס"
              select
              fullWidth
              value={form.isActive}
              onChange={handleChange("isActive")}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status.id} value={status.sent}>
                  {status.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="טלפון"
              fullWidth
              value={form.phone}
              onChange={handleChange("phone")}
            />
          </Grid>
        
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          ביטול
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
}
