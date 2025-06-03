import { Paper, Stack, TextField, Typography, MenuItem, Button, Box } from "@mui/material";
import { React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseAction } from "../features/course/courseActions";
import { fetchCourseStatuses } from "../features/statusCourse/statusCourseActions";

const NewCourse = (open=true, setOpen) => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statusCourse.statuses);

  
  const [formData, setFormData] = useState({
    courseName: '',
    coordinatorName: '',
    courseCode: '',
    startDate: '',
    endDate: '',
    year: '',
    meetingsCount: '',
    studentsCount: '',
    notes: '',
    status: '',
    color: '#ffffff',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusId = (statusText) => {
    return statuses[statusText] ?? null;
};

  const handleSubmit = () => {
      const dtoToSend = {
     Name: formData.courseName,
  Year: parseInt(formData.year),
  Color: formData.color,
  StartDate: formData.startDate, // לוודא שהוא בפורמט yyyy-MM-dd
  EndDate: formData.endDate || null,
  NumberOfMeetings: formData.meetingsCount ? parseInt(formData.meetingsCount) : null,
  NumberOfStudents: parseInt(formData.studentsCount),
  Notes: formData.notes || null,
 StatusId: getStatusId(formData.status) // פונקציה שתמיר טקסט למספר סטטוס
  };
    dispatch(addCourseAction(dtoToSend));
  };

  useEffect(() => {
  dispatch(fetchCourseStatuses());
  }, [dispatch]);
  

  return (
    <Paper
       elevation={0}
       dir="rtl"
  sx={{
     position: 'absolute',
    top: { xs: '2%', md: '12%' },         // כ־232px מתוך 1920px
    left: { xs: '2%', md: '4.375%' },      // כ־84px מתוך 1920px
    width: { xs: '90%', md: '77%' },       // 1476px מתוך 1920px ≈ 77%
    height: { xs: 'auto', md: '47%' },     // 507px מתוך 1080px ≈ 47%
    borderRadius: '10px',
    background: '#FFFFFF',
    boxShadow: '0px 0px 4px 0px #DCE2EC',
    paddingTop: { xs: '2%', md: '1.8%' },   // יחסית לגובה
    paddingRight: { xs: '4%', md: '2%' },  // יחסית לרוחב
    paddingBottom: { xs: '5%', md: '3.7%' },
    paddingLeft: { xs: '4%', md: '2%' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: { xs: '2%', md: '2.2%' },
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
        inputProps={{ dir: "rtl", readOnly: true  }}
        InputLabelProps={{ sx: { right: 0 } }}
        sx={{ width: '200px', pointerEvents: 'none' }}
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
      <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: '16px'}}>
  <Typography
    variant="body2"
    sx={{
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
    }}
  >
    צבע לטבלה
  </Typography>

  <Box
    component="input"
    type="color"
    name="color"
    value={formData.color}
    onChange={handleChange}
    sx={{
      width: '32px',
      height: '28.44px',
      borderRadius: '4px',
      border: '1px solid #6F6F6F',
      padding: 0,
      backgroundColor: 'transparent',
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      outline: 'none',
      '&::-webkit-color-swatch-wrapper': {
        padding: 0,
        borderRadius: '4px',
      },
      '&::-webkit-color-swatch': {
        border: 'none',
        borderRadius: '4px',
      },
      '&::-moz-color-swatch': {
        border: 'none',
        borderRadius: '4px',
      },
    }}
  />
</Stack>


      </Stack>
      <Stack
  direction="row"
  spacing={2}
  justifyContent="center"
  sx={{
    width: '100%',

  }}
>
</Stack>
    </Paper>
  );
};

export default NewCourse;
