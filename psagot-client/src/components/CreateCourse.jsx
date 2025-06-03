import { Checkbox, Paper, Stack, TextField, Typography, MenuItem, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseAction } from "../features/course/courseActions";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CreateCourse = (open=true, setOpen) => {
  const dispatch = useDispatch();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = useState({
    coordinatorName: "",
    courseName: "",
    courseCode: "",
    startDate: "",
    endDate: "",
    year: "",
    meetingsCount: "",
    studentsCount: "",
    notes: "",
    status: "",
    color: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addCourseAction(formData));
  };

  const statuses = ["פעיל", "לא פעיל", "ממתין"];

  return (
    <>
    <Dialog
        open={open||true}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    <Paper
       elevation={0}
       dir="rtl"
       sx={{
        display: 'inline-flex',
        padding: '40px',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #C6C6C6',
        background: '#FFF',
        boxShadow: '0px 0px 4px 0px rgba(220, 226, 236, 0.80)',
        width: { xs: 'auto', sm: 'auto', md: 'auto', lg: '70vw'},
        height: { xs: 'auto', sm: 'auto', md: 'auto', lg: '68vh'},
      }}
    >
      <Typography variant='body1' fontWeight='bold'
      sx={{
        textAlign: "right",
        fontFamily: 'Rubik',
         fontSize: {xs: '1.5rem', sm: '1.75rem', md: '2rem'},
        fontStyle: 'normal',
        fontWeight:700,
        lineHeight: 'normal',
        textTransform: 'capitalize',
        width: '100%',
        color: '#0D1783',
         mt: {xs: 1, sm: 2, md: 1},
         mb: {xs: 1, sm: 2, md: 1},
      }}>
        הוספת קורס
      </Typography>
      
      {/* Top Row */}
      <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      >
        <TextField
        name="courseCode"
        label="קוד קורס"
        variant="standard"
        value={formData.courseCode}
        onChange={handleChange}
        inputProps={{ dir: "rtl" }}
        InputLabelProps={{ sx: { right: 0 } }}
        sx={{ width: '200px' }}
        />
 
  <Box sx={{ mr: 2 }}>
    <TextField
      name="courseName"
      label="שם קורס"
      variant="standard"
      value={formData.courseName}
      onChange={handleChange}
      inputProps={{ dir: "rtl" }}
      InputLabelProps={{ sx: { right: 0 } }}
      sx={{ width: '200px' }}
    />
  </Box>
  <Box sx={{ mr: 4 }}>
  <TextField
    name="coordinatorName"
    label="שם רכזת"
    variant="standard"
    value={formData.coordinatorName}
    onChange={handleChange}
    inputProps={{ dir: "rtl" }}
    InputLabelProps={{ sx: { right: 0 } }}
    sx={{ width: '200px' }}
  />
  </Box>
</Stack>



      {/* Middle Row */}
<Stack direction="row" justifyContent="flex-end" alignItems="center">
  <TextField
    name="year"
    label="שנה"
    variant="standard"
    value={formData.year}
    onChange={handleChange}
    inputProps={{ dir: "rtl" }}
    InputLabelProps={{ sx: { right: 0 } }}
    sx={{ width: '200px' }}
  />
  <Box sx={{ mr: 2 }}>
    <TextField
      name="startDate"
      label="תאריך התחלה"
      type="date"
      variant="standard"
      value={formData.startDate}
      onChange={handleChange}
      InputLabelProps={{ shrink: true, sx: { right: 0 } }}
      sx={{ width: '200px' }}
      inputProps={{ dir: "rtl" }}
    />
  </Box>
  <Box sx={{ mr: 4 }}>
    <TextField
      name="endDate"
      label="תאריך סיום"
      type="date"
      variant="standard"
      value={formData.endDate}
      onChange={handleChange}
      InputLabelProps={{ shrink: true, sx: { right: 0 } }}
      sx={{ width: '200px' }}
      inputProps={{ dir: "rtl" }}
    />
  </Box>
</Stack>


     {/* Third Row */}
<Stack direction="row" justifyContent="flex-end" alignItems="center">
  <TextField
    name="studentsCount"
    label="מספר תלמידים"
    type="number"
    variant="standard"
    value={formData.studentsCount}
    onChange={handleChange}
    inputProps={{ dir: "rtl" }}
    InputLabelProps={{ sx: { right: 0 } }}
    sx={{ width: '200px' }}
  />
  <Box sx={{ mr: 2 }}>
    <TextField
      name="meetingsCount"
      label="מספר מפגשים"
      type="number"
      variant="standard"
      value={formData.meetingsCount}
      onChange={handleChange}
      inputProps={{ dir: "rtl" }}
      InputLabelProps={{ sx: { right: 0 } }}
      sx={{ width: '200px' }}
    />
  </Box>
</Stack>

      {/* Notes */}
      <TextField
        name="notes"
        label="הערות"
        variant="standard"
        multiline
        rows={3}
        value={formData.notes}
        onChange={handleChange}
        sx={{ width: 414 }}
        inputProps={{ dir: "rtl" }}
        InputLabelProps={{ sx: { right: 0 } }}
      />

      {/* Status and Checkbox */}
      <Stack direction="row" spacing={3} alignItems="center">
        <TextField
          select
          name="status"
          label="סטטוס"
          variant="standard"
          value={formData.status}
          onChange={handleChange}
          sx={{ width: 200,
            '& .MuiSelect-icon': {
      left: 0,
      right: 'auto',
    },
          }}
          InputLabelProps={{ sx: { right: 0 } }}
          
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))},
          
          
        </TextField>
        <Stack direction="row" spacing={2} alignItems="center">
          <Checkbox
            checked={formData.color}
            name="color"
            onChange={handleChange}
          />
          <Typography variant="body2" sx={{ textAlign: "right" }}>
            צבע לטבלה
          </Typography>
        </Stack>
      </Stack>
      <Stack
  direction="row"
  spacing={2}
  justifyContent="center"
  sx={{
    width: '100%',
   // mt: 4,
  }}
>
  <Button
    variant="outlined"
    onClick={() => {/* למשל: navigate(-1) */}}
    sx={{
      height: '44px',
      padding: '0px 24px',
      borderRadius: '50px',
      border: '1px solid #326DEF',
      color: '#326DEF',
      fontWeight: 500,
    }}
  >
    ביטול
  </Button>

  <Button
    variant="contained"
    onClick={handleSubmit}
    sx={{
      height: '44px',
      padding: '0px 24px',
      borderRadius: '50px',
      background: '#326DEF',
      color: '#fff',
      fontWeight: 500,
      '&:hover': {
        background: '#285ac0',
      },
    }}
  >
    שמור
  </Button>
</Stack>
    </Paper>
    </>
  );
};

export default CreateCourse;
