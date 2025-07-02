import { Paper, Stack, TextField, Typography, MenuItem, Button, Box } from "@mui/material";
import { React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseAction } from "../features/course/courseActions";
import { fetchCourseStatuses } from "../features/statusCourse/statusCourseActions";
import Plus from '../assets/icons/circle-plus-black.png';
import { fetchAllDays } from '../features/day/dayActions';
import { addDaysForCourseAction } from '../features/daysForCourse/daysForCourseActions';
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import dayjs from "dayjs";



const NewCourse = () => {
  const dispatch = useDispatch();
  const {statuses, status, error} = useSelector((state) => state.statusCourse);
  const { days } = useSelector((state) => state.day);
  const [daysToAdd, setDaysToAdd] = useState([
    { day: '', time: '', isScheduled: false }]);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { status: courseSaveStatus, error: courseSaveError } = useSelector((state) => state.course);



  const [formData, setFormData] = useState({
    courseName: '',
    coordinatorName: '',
    courseCode: '',
    startDate: null,
    endDate: null,
    year: '',
    meetingsCount: '',
    studentsCount: '',
    notes: '',
    status: '',
    color: '#ffffff',
  });
  

  const handleChange = (e) => {
    console.log(e.target, e)
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleCancel = () => {
  navigate('/courses');
};

const handleCloseSnackbar = (_, reason) => {
  if (reason === 'clickaway') return;
  setOpenSnackbar(false);
};



  const handleSubmit = () => {
    console.log("formData.status:", formData.status);
      const dtoToSend = {
        Name: formData.courseName,
        Year: parseInt(formData.year),
        Color: formData.color,
        StartDate: formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null,
        EndDate: formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null,
        NumberOfMeetings: formData.meetingsCount ? parseInt(formData.meetingsCount) : null,
        NumberOfStudents: parseInt(formData.studentsCount),
        Notes: formData.notes || null,
        StatusId: formData.status ==='' ? null : Number(formData.status)
      };
    console.log("DTO to send:", dtoToSend);
    dispatch(addCourseAction(dtoToSend));
  };

  const handleDayChange = (index, field, value) => {
  const updatedDays = [...daysToAdd];
  updatedDays[index][field] = field === 'isScheduled' ? value.target.checked : value;
  setDaysToAdd(updatedDays);
};
const handleSchedule = () => {
   const courseId = 123; // צריך לקבל מהקורס השמור או מסטייט

  const payload = daysToAdd.map((day) => ({
    courseId,
    dayName: day.day,
    time: day.time,
    isScheduled: day.isScheduled,
  }));

  console.log("Days to send:", payload);

  payload.forEach((dayForCourse) => {
    dispatch(addDaysForCourseAction(dayForCourse));
  });
};
const handleAddDay = () => {
  setDaysToAdd((prev) => [...prev, { day: '', time: '', isScheduled: false }]);
};

useEffect(() => {
  if (courseSaveStatus === 'succeeded') {
    setOpenSnackbar(true);
    const timer = setTimeout(() => {
      navigate('/courses');
    }, 3000);
     return () => clearTimeout(timer);
  }
  if (courseSaveStatus === 'failed') {
    alert(`אירעה שגיאה בעת שמירת הקורס: ${courseSaveError}`);
  }
}, [courseSaveStatus, courseSaveError, navigate]);


  useEffect(() => {
     if (status === 'idle'){
      dispatch(fetchCourseStatuses());
     }
     console.log("statuses", statuses);
  },[dispatch, status, statuses]);

  useEffect(() => {
  dispatch(fetchAllDays());
}, [dispatch]);
  
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper
       elevation={0}
       dir="rtl"
       sx={{
        width: '70rem',
        height: { xs: 'auto', md: '47%' },
        borderRadius: '10px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 4px 0px #DCE2EC',
        padding: '1.25rem 1.875rem 2.5rem 1.875rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2 rem',
      }}
      >
        <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ width: '100%' }}
        >
          <Button
          variant="outlined"
         onClick={handleCancel}
          sx={{
            height: '44px',
            padding: '0px 24px',
            borderRadius: '50px',
            border: '1px solid #326DEF',
            color: '#326DEF',
            fontWeight: 500,
            left: '1%',
          }}
          >
            ביטול
          </Button>
          <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '2.75 rem',
            padding: '0rem 1.5rem',
            borderRadius: '50px',
            background: '#326DEF',
            color: '#fff',
            fontWeight: 500,
            '&:hover': {background: '#285ac0',},
          }}
          >
            שמור
          </Button>
        </Stack>

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
         
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <Box sx={{ mr: 2 }}>
            <DatePicker
             // name="startDate"
              label="תאריך התחלה"
              variant="standard"
              value={formData.startDate}
              onChange={(newValue) =>
        setFormData((prev) => ({ ...prev, startDate: newValue }))
      }
              slotProps={{
        textField: {
          variant: 'standard',
          sx: { width: '200px' },
          InputLabelProps: { sx: { right: 0 } },
        }
      }}
            />
          </Box>
            <Box sx={{ mr: 4 }}>
            <DatePicker
              //name="endDate"
              label="תאריך סיום"
             // type="text"
              variant="standard"
              value={formData.endDate}
                onChange={(newValue) =>
        setFormData((prev) => ({ ...prev, endDate: newValue }))
      }
              slotProps={{
        textField: {
          variant: 'standard',
          sx: { width: '200px' },
          InputLabelProps: { sx: { right: 0 } },
        }
      }}
            />
          </Box>

          </LocalizationProvider>
        </Stack>
     {  /* Third Row */}
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <TextField
            name="studentsCount"
            label="מספר תלמידים"
            type="number"
            variant="standard"
            value={formData.studentsCount || ''}
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
            onChange={e=>handleChange(e)}
            sx={{ width: 200,
              '& .MuiSelect-icon': { left: 0, right: 'auto', },
            }}
            InputLabelProps={{ sx: { right: 0 } }}          
          >
             <MenuItem value="">סטטוס</MenuItem>
            {status==="succeeded" && statuses?.length > 0 ? (
              console.log(statuses),

              statuses.map((s, index) => (
                <MenuItem key={index} value={s.statusCourseId}>
                {s.name}
                </MenuItem>
              ))
              ) : (<MenuItem disabled value={undefined}>לא נמצאו סטטוסים להצגה</MenuItem>)
            }
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
          sx={{ width: '100%' }}> 
        </Stack>
      </Paper>
<Paper
  elevation={0}
  dir="rtl"
  sx={{
    display: 'flex',
    width: '70rem',
    padding: '1.25rem 1.875rem 1.5625rem 1.875rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',
    borderRadius: '0.625rem',
    background: '#FFF',
    boxShadow: '0px 0px 4px 0px rgba(220, 226, 236, 0.80)'
  }}
>
  {/* שורה עליונה: כותרת + כפתור "שבץ" */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}
  >
    {/* כותרת */}
    <Typography
      sx={{
        color: '#393939',
        textAlign: 'right',
        fontFamily: 'Rubik',
        fontSize: '1.125rem',
        fontWeight: 500,
      }}
    >
      שיבוץ במערכת
    </Typography>

    {/* כפתור שבץ */}
    <Button
      variant="contained"
      onClick={handleSchedule}
      sx={{
        height: '2.75rem',
        padding: '0rem 1.5rem',
        borderRadius: '3.125rem',
        background: '#326DEF',
        color: '#fff',
        fontWeight: 500,
        fontSize: '1rem',
        '&:hover': {
          background: '#285ac0',
        },
      }}
    >
      שבץ
    </Button>
  </Box>

  {/* שורת השדות: יום, שעה, שיבוץ תקין */}
 {daysToAdd.map((item, index) => (
  <Box
    key={index}
    sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '1.5rem',
      width: '100%',
    }}
  >
    {/* יום מתוך days מהשרת */}
    <TextField
      select
      variant="standard"
      label= 'יום'
      value={item.day}
      onChange={(e) => handleDayChange(index, 'day', e.target.value)}
      InputLabelProps={{ sx: { right: 0 } }}  
      sx={{
        width: '12.5rem',
        borderBottom: '1px solid #C6C6C6',
        '& .MuiSelect-icon': { left: 0, right: 'auto', },
      }}            
    >
      <MenuItem value="">בחר יום</MenuItem>
      {days?.map((day) => (
        <MenuItem key={day.dayId} value={day.name}>
          {day.name}
        </MenuItem>
      ))}
    </TextField>

    {/* שעה */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <TimePicker
    label="שעה"
    value={item.time ? dayjs(item.time, 'HH:mm') : null}
    onChange={(newValue) =>
      handleDayChange(index, 'time', newValue ? newValue.format('HH:mm') : '')
    }
    ampm={false}
    slotProps={{
      textField: {
        variant: 'standard',
        sx: { width: '12.5rem' },
        InputLabelProps: { sx: { right: 0 } },
        inputProps: { dir: 'rtl', style: { textAlign: 'right' } },
      },
    }}
  />
</LocalizationProvider>
 

    {/* שיבוץ תקין */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2">שיבוץ תקין</Typography>
      <input
        type="checkbox"
        checked={item.isScheduled}
        onChange={(e) => handleDayChange(index, 'isScheduled', e)}
      />
    </Box>
  </Box>
))}


  {/* כפתור הוספת יום */}
  <Box sx={{ mt: 1, height: '1.25rem'}}>
    <Button
    onClick={handleAddDay}
      sx={{
       display: 'flex',
       padding: '0rem 0.25rem',
       justifyContent: 'flex-end',
       alignItems: 'center',
       gap: '0.375rem',
       borderRadius: '3.125rem',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <img
        src={Plus}
        alt="אייקון הוספת יום"
        style={{ width: '12wv', height: '12hv' }}
      />
      <Typography
        sx={{
          fontFamily: 'Rubik',
          fontSize: '0.875rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          textTransform: 'capitalize',
          color: 'var(--Neutral-80, #393939)',
        }}
      >
        הוספת יום
      </Typography> 
    </Button>
  </Box>
</Paper>
<Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} elevation={6} variant="filled">
    שמירת פרטי הקורס הסתיימה בהצלחה
  </MuiAlert>
</Snackbar>


    </Box>
 );   
};

export default NewCourse;
