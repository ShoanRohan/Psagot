import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl, Switch, FormControlLabel, CircularProgress, Alert, Snackbar, Autocomplete } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { fetchAllRooms } from '../features/room/roomActions';
import { fetchAllCourses } from '../features/course/courseActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import { fetchAllUsers } from '../features/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { addMeetingAction, updateMeetingAction } from '../features/meeting/meetingActions';
import { clearError } from '../features/meeting/meetingSlice';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const MeetingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { meetingId } = useParams();
const isEditMode=meetingId?true:false;
const { isLoading, error: reduxError } = useSelector(state => state.meeting);

  const initialFormData = {
   meetingId: 0,
    scheduleForTopicId: null,
    meetingNumberForTopic: 1,
    year: '',
    roomId: '',
    isValid: true,
    startTime: '',
    endTime: '',
    meetingDate: '', 
    dayId: null,
    courseId: '',
    courseName: '', 
    topicId: '',
    topicName: '', 
    teacherId: '',
    teacherName: '',
    reason: null,
    statusCourseId: 0,
    isPartOfSchedule: false
  };

  const [formData, setFormData] = useState(initialFormData);
  const rooms= useSelector(state => state.room.rooms || []);
  const meetings = useSelector(state => state.meeting.meetings|| []);
  const courses = useSelector(state => state.course.courses|| []);
  const topics = useSelector(state => state.topic.topics|| []);
  const users = useSelector(state => state.user.user || []);
  const [validationErrors, setValidationErrors] = useState({});
  const [invalidReasons, setInvalidReasons] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  useEffect(() => {
    dispatch(fetchAllRooms());
    dispatch(fetchAllCourses());
    dispatch(fetchAllTopic());
    dispatch(fetchAllUsers());
  }, [dispatch]);


useEffect(() => {
    if (meetingId) {
const meetingToEdit = meetings.find(meeting => meeting.meetingId === Number(meetingId));
        if (meetingToEdit) {
            setFormData({
                ...meetingToEdit,
                courseId: Number(meetingToEdit.courseId),
                topicId: Number(meetingToEdit.topicId),
                teacherId: Number(meetingToEdit.teacherId),
                roomId: Number(meetingToEdit.roomId),
                startTime: meetingToEdit.startTime,
                endTime: meetingToEdit.endTime,
                meetingDate: dayjs(meetingToEdit.meetingDate).isValid()
                    ? dayjs(meetingToEdit.meetingDate).format("YYYY-MM-DD")
                    : "",
                meetingNumberForTopic: Number(meetingToEdit.meetingNumberForTopic),
                isValid: meetingToEdit.isValid !== undefined ? meetingToEdit.isValid : true,
                isPartOfSchedule: meetingToEdit.isPartOfSchedule || false,
                reason: meetingToEdit.reason || '',
                statusCourseId: Number(meetingToEdit.statusCourseId) || 0    
            });
        } else {
            setFormData(initialFormData);
        }
    } else {
        setFormData(initialFormData);
    }
}, [meetingId, meetings]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // Reset topic if course changes
    if (name === 'courseId') {
      updatedFormData.topicId = '';
      updatedFormData.meetingNumberForTopic = 1;
    }

    // Reset meeting number if topic changes
    if (name === 'topicId') {
      updatedFormData.meetingNumberForTopic = 1;
    }

    // Update isPartOfSchedule based on topic or course selection
    updatedFormData.isPartOfSchedule = !!(updatedFormData.topicId || updatedFormData.courseId);

    setFormData(updatedFormData);
  };


   //כפתור ביטול
   const showCancelButton = true;

  // כפתור ביטול-חזרה לעמוד הקודם  
  const handleCancel = () => {
      navigate(-1);
    
  };

   const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {                                   
        const response = await fetch('https://localhost:44333/api/Course/status-courses');
        const data = await response.json();
        setStatusOptions(data);
      } catch (error) {
        console.error('Failed to fetch status options:', error);
      }
    };
  
    fetchStatuses();
  }, []);
  

const validateForm = () => {
        const errors = {};
        
        if (!formData.topicId && !formData.courseId) {
            errors.general = 'יש לבחור נושא או קורס';
        }
        if (!formData.topicId) errors.topicId = 'נושא הוא שדה חובה';
        if (!formData.courseId) errors.courseId = 'שם קורס הוא שדה חובה';
        if (!formData.teacherId) errors.teacherId = 'שם מרצה הוא שדה חובה';
        if (!formData.roomId) errors.roomId = 'מספר חדר הוא שדה חובה';
        if (!formData.meetingDate) errors.meetingDate = 'תאריך הוא שדה חובה';
        if (!formData.startTime) errors.startTime = 'שעת התחלה היא שדה חובה';
        if (!formData.endTime) errors.endTime = 'שעת סיום היא שדה חובה';
        if (!formData.year) errors.year = 'שנה היא שדה חובה';

        // Additional validation for edit mode
        if (isEditMode) {
            if (!formData.meetingId) errors.meetingId = 'מספר מפגש הוא שדה חובה';
            if (!formData.topicId) errors.topicId = 'נושא הוא שדה חובה';
            if (!formData.courseId) errors.courseId = 'קורס הוא שדה חובה';
            if (!formData.teacherId) errors.teacherId = 'מרצה הוא שדה חובה';
            if (!formData.roomId) errors.roomId = 'מספר חדר הוא שדה חובה';
            if (!formData.meetingDate) errors.meetingDate = 'תאריך הוא שדה חובה';
            if (!formData.startTime) errors.startTime = 'שעת התחלה היא שדה חובה';
            if (!formData.endTime) errors.endTime = 'שעת סיום היא שדה חובה';
            if (!formData.year) errors.year = 'שנה היא שדה חובה';
            if (!formData.isValid) errors.isValid = 'שיבוץ תקין הוא שדה חובה';
            if (!formData.reason) errors.reason = 'סיבה הוא שדה חובה';
            if (!formData.statusCourseId) errors.statusCourseId = 'סטטוס הוא שדה חובה';
            if (!formData.isPartOfSchedule) errors.isPartOfSchedule = 'חלק מהמערכת הוא שדה חובה';
        }

        return errors;
    };


    const isRoomAvailable = (roomId, meetingDate, startTime, endTime, existingMeetings, currentEditMode, currentMeetingId) => {
    if (!roomId || !meetingDate || !startTime || !endTime || !existingMeetings?.length) {
      return true; // If any required data is missing, assume it's available (client-side validation should catch this)
    }

    const roomIdNum = parseInt(roomId, 10);

    return !existingMeetings.some(meeting => {
      // If in edit mode, and this is the meeting being edited, skip it for the availability check
      if (currentEditMode && meeting.meetingId === currentMeetingId) {
        return false;
      }

      return (
        meeting.roomId === roomIdNum &&
        meeting.meetingDate === meetingDate &&
        (
          (startTime >= meeting.startTime && startTime < meeting.endTime) ||
          (endTime > meeting.startTime && endTime <= meeting.endTime) ||
          (startTime <= meeting.startTime && endTime >= meeting.endTime)
        )
      );
    });
  };

  // Helper function for calculating meeting number
  const calculateMeetingNumber = (topicId, meetingDate, allMeetings = []) => {
    const topicMeetings = allMeetings
      .filter(meeting => meeting.topicId === topicId)
      .sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));

    // Find index of current meetingDate in sorted list to get its number
    let count = 0;
    for (let i = 0; i < topicMeetings.length; i++) {
        if (new Date(topicMeetings[i].meetingDate).toDateString() === new Date(meetingDate).toDateString()) {
            count++;
            
        }
    }
    return count > 0 ? count : 1; // Return count or 1 if no prior meetings on this topic/date
  };

  // Helper function to check if meeting is part of system
  const checkIsPartOfSystem = () => {
    return !!(formData.topicId || formData.courseId);
  };

  // Helper function for invalid "Shivutz Takkin"
  const isShivutzInvalid = (meeting, topic, course, room) => {
    const reasons = [];
    const meetingDay = new Date(meeting.meetingDate).getDay(); // 0 = Sunday, 1 = Monday etc.

    // Ensure topic or course exists before checking their properties
    if (topic) {
        if (!topic.days?.includes(meetingDay) || !topic.hours?.includes(meeting.startTime.substring(0, 5))) { // Compare "HH:mm" only
            reasons.push("המפגש אינו בשעות או בימים של הנושא");
        }

        const roomFeatures = room?.features || [];
        const topicFeatures = topic.requiredFeatures || [];
        const missingFeatures = topicFeatures.filter(f => !roomFeatures.includes(f));
        if (missingFeatures.length > 0) {
            reasons.push("החדר אינו מתאים למאפייני הנושא: " + missingFeatures.join(", "));
        }
    } else if (course) { // Only check course if no topic is selected
        if (!course.days?.includes(meetingDay) || !course.hours?.includes(meeting.startTime.substring(0, 5))) { // Compare "HH:mm" only
            reasons.push("המפגש אינו בשעות או בימים של הקורס");
        }
    } else {
        reasons.push("יש לבחור נושא או קורס כדי לבדוק את תקינות השיבוץ.");
    }

    if (course && room?.capacity < course.studentsCount) {
      reasons.push("קיבולת החדר קטנה ממספר התלמידים בקורס");
    }

    return {
      isInvalid: reasons.length > 0,
      reasons: reasons
    };
  };

const handleSaveMeeting = async () => {
  const formatTime = (timeStr) => {
  return timeStr.length === 5 ? `${timeStr}:00` : timeStr;
};
    // Clear previous errors
    setValidationErrors({});
    setInvalidReasons([]);
    
    // Validate form
    const errors = validateForm();
    console.log("Validation Errors:", errors);
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
        alert('אנא תקן את השגיאות בטופס');
        return;
    }

    try {
        // Get related objects
        const selectedTopic = topics.find(t => t.topicId === parseInt(formData.topicId));
        const selectedCourse = courses.find(c => c.courseId === parseInt(formData.courseId));
        const selectedRoom = rooms.find(r => r.roomId === parseInt(formData.roomId));

        // Validate "Shivutz"
        const validationResult = isShivutzInvalid(formData, selectedTopic, selectedCourse, selectedRoom);
        
        if (validationResult.isInvalid) {
            const confirmSave = window.confirm(
                `השיבוץ אינו תקין מהסיבות הבאות:\n${validationResult.reasons.join('\n')}\n\nהאם לשמור בכל זאת?`
            );
            if (!confirmSave) {
                setInvalidReasons(validationResult.reasons);
                return;
            }
        }

        // Check room availability
        if (!isRoomAvailable(
            parseInt(formData.roomId), 
            formData.meetingDate, 
            formData.startTime, 
            formData.endTime, 
            meetings, 
            isEditMode,
            formData.meetingId
        )) {
            setValidationErrors(prev => ({ 
                ...prev, 
                roomId: 'החדר אינו פנוי בתאריך ובשעות המבוקשות' 
            }));
            alert('החדר אינו פנוי בתאריך ובשעות המבוקשות');
            return;
        }

        // Calculate meeting number if needed
        let meetingNumberForTopic = 1;
        if (formData.topicId && formData.courseId) {
            meetingNumberForTopic = calculateMeetingNumber(parseInt(formData.topicId), formData.meetingDate, meetings);
        }

        // Calculate day ID from meeting date
        const meetingDateObj = new Date(formData.meetingDate);
        const dayId = meetingDateObj.getDay() + 1;


        // Prepare DTO - נתונים נקיים לשרת
       var meetingDTO = {
          // meetingId: isEditMode ? Number(formData.meetingId) : null,
          topicId: formData.topicId ? Number(formData.topicId) : null,
          courseId: formData.courseId ? Number(formData.courseId) : null,
          teacherId: formData.teacherId ? Number(formData.teacherId) : null,
          roomId: Number(formData.roomId),
         startTime: formatTime(formData.startTime),
  endTime: formatTime(formData.endTime),
          meetingDate: dayjs(formData.meetingDate).format("YYYY-MM-DD"),
          meetingNumberForTopic: formData.meetingNumberForTopic || meetingNumberForTopic,
          isValid: validationResult.reasons.length === 0,
          year: parseInt(formData.year, 10),
          dayId: dayId,
          isPartOfSchedule: formData.isPartOfSchedule ?? false,
          scheduleForTopicId: formData.scheduleForTopicId ? parseInt(formData.scheduleForTopicId, 10) : null,
          reason: validationResult.reasons.join('\n') || formData.reason || '',
          statusCourseId: formData.statusCourseId && Number(formData.statusCourseId) > 0 ? Number(formData.statusCourseId) : undefined

        };
          meetingDTO= isEditMode ?{...meetingDTO,meetingId:Number(formData.meetingId)}:meetingDTO;
 

        console.log("Sending meeting data:", meetingDTO);
        console.log("DTO being sent to server:", JSON.stringify(meetingDTO, null, 2));

        // Dispatch action
        const action = isEditMode ? updateMeetingAction : addMeetingAction;
        const resultAction = await dispatch(action(meetingDTO));
        
        // בדיקה מתוקנת - בהתבסס על מבנה Redux Toolkit
        if (addMeetingAction.fulfilled.match(resultAction) || updateMeetingAction.fulfilled.match(resultAction)) {
        console.log('Meeting saved successfully:', resultAction.payload);
        alert(isEditMode ? 'המפגש עודכן בהצלחה!' : 'המפגש נוסף בהצלחה למערכת!');
        
        if (!isEditMode) {
          // איפוס הטופס כמו בדף המקורי
          setFormData({
            meetingId: 0,
    scheduleForTopicId: null,
    meetingNumberForTopic: 1,
    year: '',
    roomId: '',
    isValid: true,
    startTime: '',
    endTime: '',
    meetingDate: '', 
    dayId: null,
    courseId: '',
    courseName: '', 
    topicId: '',
    topicName: '', 
    teacherId: '',
    teacherName: '',
    reason: null,
    statusCourseId: 0,
    isPartOfSchedule: false
          });
        }
    {
          
          navigate(-1);
        }
      } else {
        throw new Error(resultAction.payload || resultAction.error?.message || 'Unknown error');
      }

    } catch (error) {
      console.error('Failed to save meeting:', error);
      
      let errorMessage = isEditMode ? 'שגיאה בעדכון המפגש במערכת' : 'שגיאה בשמירת המפגש במערכת';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.response?.data) {
        const apiError = error.response.data;
        if (typeof apiError === 'string') {
          errorMessage = `שגיאה מהשרת: ${apiError}`;
        } else if (apiError.errors) {
          const validationMessages = Object.entries(apiError.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          errorMessage = `שגיאות ולידציה:\n${validationMessages}`;
        } else if (apiError.title || apiError.detail) {
          errorMessage = `שגיאה: ${apiError.title || apiError.detail}`;
        }
      } else if (error.message) {
        errorMessage = `שגיאה: ${error.message}`;
      }

      alert(errorMessage);
    }
  };

  // Topic options filtered by selected course
  const filteredTopics = formData.courseId
    ? topics.filter(topic => topic.courseId === parseInt(formData.courseId, 10))
    : topics;

  // סגנון משותף לכל שדות הטקסט
  const textFieldStyle = {
    width: 200,
    height: 45,
    '& .MuiInputBase-root': {
      height: 45,
    },
    '& .MuiOutlinedInput-root': {
      height: 45,
      '& fieldset': {
        borderBottom: '1px solid #C6C6C6',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderBottom: '1px solid #C6C6C6',
      },
      '&.Mui-focused fieldset': {
        borderBottom: '1px solid #C6C6C6',
      },
    },
    '& .MuiInput-underline:before': {
        borderBottom: '1px solid #C6C6C6',
      },
      '& .MuiInput-underline:after': {
        borderBottom: '1px solid #C6C6C6',
      },
    };

     // סגנון לכפתור ביטול
     const cancelButtonStyle = {
      width: '83px',
      height: '44px',
      position: 'relative',
      top: '84px',
      left: '130px',
      borderRadius: '50px',
      border: '1px solid #326DEF',
      paddingRight: '24px',
      paddingLeft: '24px',
      color: '#326DEF',
      backgroundColor: 'transparent',
      textTransform: 'none',
      fontWeight: 'normal'
};

const saveButtonStyle = {
  width: '82px',
  height: '44px',
  position: 'relative',
  top: '84px',
  left: '80px',
  borderRadius: '50px',
  paddingRight: '24px',
  paddingLeft: '24px',
  backgroundColor: '#326DEF',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#326DEF',
  }
};

  return (
   <>
      <h2>{isEditMode ? 'עריכת מפגש' : 'הוספת מפגש'}</h2>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 15}}>
        <Button
                variant="outlined"
                onClick={handleCancel}
                sx={cancelButtonStyle}
            >
                ביטול
            </Button>
            <Button
                variant="contained"
                onClick={handleSaveMeeting}
                sx={saveButtonStyle}
            >
                שמור
            </Button>
        </Box>

        <Container
        maxWidth="lg"
        sx={{
          maxWidth: '1476px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0px 0px 4px 0px #DCE2ECCC',
          marginTop: '20px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            פרטים טכניים
          </Typography>
        </Box>

        <form>
          <Grid container spacing={4} sx={{ flexWrap: 'wrap' }}>
          
            {/* שדה קורס עם Autocomplete */}
            <Grid item xs={3}>
              <Autocomplete
                options={courses}
                getOptionLabel={(option) => option.name}
                value={courses.find(c => c.courseId === formData.courseId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    courseName: newValue?.name || '',
                    courseId: newValue?.courseId || ''
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="שם קורס"
                    error={!!validationErrors.courseId}
                    helperText={validationErrors.courseId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>
               {/* שדה נושא עם Autocomplete כמו בדף המקורי */}
            <Grid item xs={3}>
              <Autocomplete
                options={filteredTopics}
                getOptionLabel={(option) => option.name}
                value={filteredTopics.find(t => t.topicId === formData.topicId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    topicName: newValue?.name || '',
                    topicId: newValue?.topicId || '',
                    meetingNumberForTopic: newValue?.numberOfMeetings || '',
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="שם נושא"
                    error={!!validationErrors.topicId}
                    helperText={validationErrors.topicId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>

            {/* שדה מרצה עם Autocomplete וסינון */}
            <Grid item xs={3}>
              <Autocomplete
                options={users.filter(user => user.userTypeId === 4)}
                getOptionLabel={(option) => option.name}
                value={users.find(u => u.userId === formData.teacherId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    teacherName: newValue?.name || '',
                    teacherId: newValue?.userId || ''
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="שם מרצה"
                    error={!!validationErrors.teacherId}
                    helperText={validationErrors.teacherId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>

            {/* שדה חדר עם Autocomplete */}
            <Grid item xs={3}>
              <Autocomplete
                options={rooms}
                getOptionLabel={(option) => option.name}
                value={rooms.find(r => r.roomId === formData.roomId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    roomId: newValue?.roomId || ''
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="מספר חדר"
                    error={!!validationErrors.roomId}
                    helperText={validationErrors.roomId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>

             <Grid item xs={3}>
              <TextField
                label="תאריך"
                name="meetingDate"
                type="date"
                value={formData.meetingDate || ''}
                onChange={handleChange}
                error={!!validationErrors.meetingDate}
                helperText={validationErrors.meetingDate}
                margin="none"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>
          

            <Grid item xs={3}>
              <TextField
                label="שנה"
                name="year"
                value={formData.year || ''}
                onChange={handleChange}
                error={!!validationErrors.year}
                helperText={validationErrors.year}
                margin="none"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

          

            <Grid item xs={3}>
              <TextField
                label="שעת התחלה"
                name="startTime"
                type="time"
                value={formData.startTime || ''}
                onChange={handleChange}
                error={!!validationErrors.startTime}
                helperText={validationErrors.startTime}
                margin="none"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
  label="שעת סיום"
  name="endTime"
  type="time"
  value={formData.endTime || ''}
  onChange={handleChange}
  error={!!validationErrors.endTime}
  helperText={validationErrors.endTime}
  margin="none"
  required
  InputLabelProps={{ shrink: true }}
  variant="outlined"
  sx={textFieldStyle}
/>
</Grid>


        {/* שדות רק לעורכים */}
        {isEditMode && (
          <>
            <Grid item>
              <TextField
                label="מספר מפגש"
                name="meetingId"
                value={formData.meetingId || ''}
                onChange={handleChange}
                margin="none"
                variant="outlined"
                fullWidth
                disabled={isEditMode}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth error={!!validationErrors.statusId}>
                <InputLabel>סטטוס</InputLabel>
               <Select
               name="statusCourseId"
               value={formData.statusCourseId || ''}
               onChange={handleChange}
               label="סטטוס"
               >
                {statusOptions.map((status) => (
                  <MenuItem key={status.statusCourseId} value={status.statusCourseId}>
                    {status.name}
                    </MenuItem>
                  ))}
                  </Select>
                {validationErrors.statusCourseId && (
                  <Typography variant="caption" color="error">{validationErrors.statusCourseId}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      height: '56px', // התאמה לגובה TextField
      direction: 'ltr',
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: '18px',
        height: '20px',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 300,
        fontFamily: 'Font Awesome 6 Pro',
        lineHeight: '100%',
      }}
    >
      <FontAwesomeIcon icon={faXmark} />
    </Box>
    <Typography
      variant="body1"
      sx={{
        fontSize: '16px',
        fontWeight: 400,
      }}
      disabled={isEditMode}
    >
      שיבוץ תקין
    </Typography>
  </Box>
</Grid>

            <Grid item xs={12} md={4}>
              <TextField
              disable
                label="סיבה"
                name="reason"
      value={formData.reason || ''}
      onChange={handleChange}
      margin="none"
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      sx={textFieldStyle}
              />
            </Grid>

            <Grid  item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControlLabel
      control={
        <Switch
          checked={checkIsPartOfSystem()}
          disabled
          color="primary"
        />
      }
      label="חלק מהמערכת"
      labelPlacement="start"
    />
    </Grid>
          </>

          
        )}

</Grid>
</form>
</Container>
</>

  )};


export default MeetingForm;