import { Paper, Stack, TextField, Typography, MenuItem, Button, Box } from "@mui/material";
import { React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseAction } from "../features/course/courseActions";
import { fetchCourseStatuses } from "../features/statusCourse/statusCourseActions";

const CreateCourse = (open=true, setOpen) => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statusCourse.statuses);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
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
    color: '#000000',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//   const getStatusId = (statusText) => {
//     return statuses[statusText] ?? null;
// };

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
 // StatusId: getStatusId(formData.status) // פונקציה שתמיר טקסט למספר סטטוס
  };
    dispatch(addCourseAction(dtoToSend));
  };

  useEffect(() => {
  dispatch(fetchCourseStatuses());
  }, [dispatch]);
  

  return (
    <>

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
    <Paper
       elevation={0}
       dir="rtl"
  sx={{
    width: { xs: '90vw', sm: '85vw', md: '76%' },
    maxWidth: '1476px',
    height: { xs: 'auto', md: '26.4vw' }, // 507 / 1920 * 100
    top: { xs: 0, md: '12.08vw' }, // 232 / 1920 * 100
    left: { xs: 0, md: '4.375vw' }, // 84 / 1920 * 100
    paddingTop: { xs: '1rem', md: '1.25rem' },
    paddingRight: { xs: '1rem', md: '1.875rem' },
    paddingBottom: { xs: '2rem', md: '2.5rem' },
    paddingLeft: { xs: '1rem', md: '1.875rem' },
    borderRadius: '0.625rem',
    gap: { xs: 2, md: '2rem' },
    background: '#FFFFFF',
    boxShadow: '0px 0px 4px 0px rgba(220, 226, 236, 0.80)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    }}
    >      
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
  <input
    type="color"
    name="color"
    value={formData.color}
    onChange={handleChange}
    style={{
      width: 40,
      height: 40,
      border: "none",
      padding: 0,
      background: "none",
      cursor: "pointer"
    }}
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
</Stack>
    </Paper>

    </>
  );
};

export default CreateCourse;
