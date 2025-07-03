import { Paper, Stack, TextField, Typography, MenuItem, Button, Box, Alert } from "@mui/material";
import { React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseAction } from "../features/course/courseActions";
import { fetchCourseStatuses } from "../features/statusCourse/statusCourseActions";
import Plus from '../assets/icons/circle-plus-black.png';
import { fetchAllDays } from '../features/day/dayActions';
import { addDaysForCourseAction } from '../features/daysForCourse/daysForCourseActions';
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import dayjs from "dayjs";
import { resetCourseSaveStatus } from '../features/course/courseSlice';
import { useRef } from 'react';
import { fetchCoordinators } from '../features/user/userAction';  


const NewCourse = () => {
  const dispatch = useDispatch();
  const {statuses, status, error} = useSelector((state) => state.statusCourse);
  const { days } = useSelector((state) => state.day);
  const [daysToAdd, setDaysToAdd] = useState([
    { day: '', time: '', isScheduled: false }]);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const { saveStatus: courseSaveStatus, error: courseSaveError } = useSelector((state) => state.course);
  const location = useLocation();
  const hasMounted = useRef(false);
  const prevSaveStatusRef = useRef('idle');
  const { coordinators, status: coordinatorsStatus } = useSelector((state) => state.user);
  const [allowShowSnackbar, setAllowShowSnackbar] = useState(false);

  const showSnackbar = (message, severity = 'success') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

useEffect(() => {
  if (location.state?.fromUserClick) {
    dispatch(resetCourseSaveStatus()); 
    window.history.replaceState({}, document.title); 
  }
}, [dispatch, location]);

useEffect(() => {
  if (!hasMounted.current) {
    dispatch(resetCourseSaveStatus());
  }
}, [dispatch]);

useEffect(() => {
  if (coordinatorsStatus === 'idle') {
    dispatch(fetchCoordinators());
  }
}, [coordinatorsStatus, dispatch]);

const [errors, setErrors] = useState({
  courseName: '',
  coordinatorId: '',
  year: '',
  studentsCount: '',
  meetingsCount: '',
  startDate: '',
  endDate: '',
  status: '',
});

const [dayErrors, setDayErrors] = useState([]);

const validateField = (name, value) => {
  switch (name) {
    case 'courseName':
      return value.trim() === '' ? 'יש להזין שם קורס' : '';
    case 'coordinatorId':
       const num = Number(value);
       return isNaN(num) || value <= 0 ? 'יש להזין שם רכזת' : '';
    case 'year':
      return !/^\d{4}$/.test(value) ? 'יש להזין שנה תקינה (4 ספרות)' : '';
    case 'studentsCount':
      return isNaN(value) || value <= 0 ? 'יש להזין מספר תלמידים תקין' : '';
    case 'meetingsCount':
      return isNaN(value) || value <= 0 ? 'יש להזין מספר מפגשים תקין' : '';
    case 'startDate':
      return !value ? 'יש להזין תאריך התחלה' : '';
    case 'endDate':
      return !value ? 'יש להזין תאריך סיום' : '';
    case 'status':
      return value === '' ? 'יש לבחור סטטוס' : '';
    default:
      return '';
  }
};

const validateForm = () => {
  const newErrors = {};
  Object.entries(formData).forEach(([key, value]) => {
    newErrors[key] = validateField(key, value);
  });
  setErrors(newErrors);
  return Object.values(newErrors).every((x) => x === '');
};

  const [formData, setFormData] = useState({
    courseName: '',
    coordinatorId: '',
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

  const validateDays = () => {
  const newDayErrors = daysToAdd.map((day) => ({
    day: day.day ? '' : 'יש לבחור יום',
    time: day.time ? '' : 'יש לבחור שעה',
  }));
  setDayErrors(newDayErrors);
  return newDayErrors.every((d) => d.day === '' && d.time === '');
};

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log("formData.coordinatorId", formData.coordinatorId, typeof formData.coordinatorId);
  setFormData((prev) => ({ ...prev, [name]: name === 'coordinatorId' && value ? Number(value) : value }));
  setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
};


const handleCancel = () => {
  navigate('/courses');
};

  const handleSubmit = () => {
  const isCourseValid = validateForm();
  const areDaysValid = validateDays();
  if (!isCourseValid || !areDaysValid) {
    showSnackbar('יש למלא את כל השדות החובה', 'error');
    return;
  }
    setAllowShowSnackbar(true);

  const dtoToSend = {
    Name: formData.courseName,
    Year: parseInt(formData.year),
    Color: formData.color,
    StartDate: formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null,
    EndDate: formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null,
    NumberOfMeetings: parseInt(formData.meetingsCount),
    NumberOfStudents: parseInt(formData.studentsCount),
    Notes: formData.notes || null,
    StatusId: Number(formData.status),
    CoordinatorId: formData.coordinatorId,
  };

  dispatch(addCourseAction(dtoToSend));
};

  const handleDayChange = (index, field, value) => {
  const updatedDays = [...daysToAdd];
  updatedDays[index][field] = field === 'isScheduled' ? value.target.checked : value;
  setDaysToAdd(updatedDays);
};
const handleSchedule = () => {
  const invalidRows = daysToAdd.filter(day =>
    day.day === '' || day.time === ''
  );

  if (invalidRows.length > 0) {
    showSnackbar('יש למלא יום ושעה עבור כל שיבוץ לפני השיבוץ', 'error');
    return;
  }

  const courseId = 123; // צריך להחליף למזהה הקורס הנכון

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

  showSnackbar('שמירת ימי הקורס הסתיימה בהצלחה', 'success');
};

const handleAddDay = () => {
  setDaysToAdd((prev) => [...prev, { day: '', time: '', isScheduled: false }]);
};

useEffect(() => {
   if (!hasMounted.current) {
    hasMounted.current = true;
    return;
  }
  const prevStatus = prevSaveStatusRef.current;
  if (courseSaveStatus !== prevStatus) {
     prevSaveStatusRef.current = courseSaveStatus;

  if (courseSaveStatus === 'succeeded' && allowShowSnackbar) {
    showSnackbar('שמירת פרטי הקורס הסתיימה בהצלחה', 'success');
    const timer = setTimeout(() => {
      navigate('/courses');
    }, 2000);
     return () => clearTimeout(timer);
  }
  if (courseSaveStatus === 'failed' && allowShowSnackbar) {
    showSnackbar(`אירעה שגיאה בעת שמירת הקורס: ${courseSaveError}`, 'error');
  }
    dispatch(resetCourseSaveStatus());
  }
}, [courseSaveStatus, courseSaveError, navigate, dispatch, allowShowSnackbar]);


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
            disabled={
              Object.values(errors).some((x) => x !== '') ||
              !formData.courseName ||
              !formData.coordinatorId ||
              !formData.year ||
              !formData.startDate ||
              !formData.endDate ||
              !formData.studentsCount ||
              !formData.meetingsCount ||
              !formData.status
            }
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
              error={!!errors.courseName}
               helperText={errors.courseName}
              inputProps={{ dir: "rtl" }}
              InputLabelProps={{ sx: { right: 0 } }}
              sx={{ width: '200px' }}
            />
          </Box>
          <Box sx={{ mr: 4 }}>
            <TextField
              select
              name="coordinatorId"
              label="שם רכזת"
              variant="standard"
              value={formData.coordinatorId}
              onChange={(e) => handleChange(e)}
              error={!!errors.coordinatorId}
              helperText={errors.coordinatorId}
              inputProps={{ dir: "rtl" }}
              InputLabelProps={{ sx: { right: 0 } }}
              sx={{ width: '200px', '& .MuiSelect-icon': { left: 0, right: 'auto' }, }}
            >
               {coordinators && coordinators.length > 0 ? (
                coordinators.map((coord) => (
                <MenuItem key={coord.userId} value={coord.userId}>
                  {coord.name}
                </MenuItem>
                ))
               ) : (
               <MenuItem disabled value={undefined}>לא נמצאו רכזות</MenuItem>
               )}
            </TextField>
          </Box>
        </Stack>
       
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <TextField
            name="year"
            label="שנה"
            variant="standard"
            value={formData.year}
            onChange={handleChange}
             error={!!errors.year}
               helperText={errors.year}
            inputProps={{ dir: "rtl" }}
            InputLabelProps={{ sx: { right: 0 } }}
            sx={{ width: '200px' }}
          />
         
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <Box sx={{ mr: 2 }}>
            <DatePicker
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
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Box>
          <Box sx={{ mr: 4 }}>
            <DatePicker
            label="תאריך סיום"
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
            error={!!errors.endDate}
            helperText={errors.endDate}
            />
          </Box>

          </LocalizationProvider>
        </Stack>
    
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <TextField
            name="studentsCount"
            label="מספר תלמידים"
            type="number"
            variant="standard"
            value={formData.studentsCount || ''}
            onChange={handleChange}
            error={!!errors.studentsCount}
            helperText={errors.studentsCount}
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
              error={!!errors.meetingsCount}
              helperText={errors.meetingsCount}
              inputProps={{ dir: "rtl" }}
              InputLabelProps={{ sx: { right: 0 } }}
              sx={{ width: '200px' }}
            />
          </Box>
        </Stack>
       
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
            error={!!errors.status}
            helperText={errors.status}
            InputLabelProps={{ sx: { right: 0 } }}          
          >
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
      error={!!dayErrors[index]?.day}
      helperText={dayErrors[index]?.day}
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
        error: !!dayErrors[index]?.time,
        helperText: dayErrors[index]?.time,
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
  open={snackbarOpen}
  autoHideDuration={1000}
   onClose={() => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
    setSnackbarSeverity('success'); // אופציונלי, אם אתה רוצה לאפס לרמת חומרה ברירת מחדל
  }}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert
    onClose={() => {
      setSnackbarOpen(false);
      setSnackbarMessage('');
      setSnackbarSeverity('success');
    }}
    severity={snackbarSeverity}
    sx={{ width: '100%', direction: 'rtl' }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
    </Box>
 );   
};

export default NewCourse;
