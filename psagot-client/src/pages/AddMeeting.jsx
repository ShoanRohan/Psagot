import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Grid, FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {addMeetingAction} from '../features/meeting/meetingActions';
import {useNavigate} from 'react-router-dom';


const AddMeeting = () => {
    const dispatch = useDispatch();


    const [meeting, setMeeting] = useState({
        meetingId: '',//???מה עם מספר מפגש
        topicId: '',
        topicName: '',  
        courseId: '',
        courseName: '',
        lecturerId: '', 
        lecturerName: '',
        startTime: '',
        endTime: '',
        roomId: '',
        year: '',
        date: '',
    });

   
    //כפתור ביטול
    const showCancelButton = true;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeeting(prev => ({
            ...prev,
            [name]: value || ''
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New meeting added:', meeting);
    };

    // כפתור ביטול-חזרה לעמוד הקודם  
  const handleCancel = () => {
    navigate(-1);
  };

  const [validationErrors, setValidationErrors] = useState({});

const handleSaveMeeting = () => {
    const requiredFields = {
        topicName: 'שם נושא',
        courseName: 'שם קורס',
        lecturerName: 'שם מרצה',
        roomId: 'מספר חדר',
        date: 'תאריך',
        year: 'שנה',
        startTime: 'שעת התחלה',
        endTime: 'שעת סיום'
    };

    const errors = {};
    Object.keys(requiredFields).forEach(field => {
        if (!meeting[field]) {
            errors[field] = `${requiredFields[field]} - שדה חובה`;
        }
    });

    setValidationErrors(errors);
//להוסיף שמירה ב DB
    if (Object.keys(errors).length === 0) {
        dispatch(addMeetingAction(meeting))
            .then((response) => {
                console.log('המפגש נשמר בהצלחה במסד הנתונים:', response);
                
                // Clear form
                setMeeting({
                    meetingId: '',
                    topicId: '',
                    topicName: '',
                    courseId: '',
                    courseName: '',
                    lecturerId: '',
                    lecturerName: '',
                    startTime: '',
                    endTime: '',
                    roomId: '',
                    year: '',
                    date: ''
                });
                
                // Show success message
                alert('המפגש נוסף בהצלחה למערכת!');
            })
            .catch((error) => {
                alert('שגיאה בשמירת המפגש במערכת');
            });
    }
};


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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 2 }}>
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
      <br/> <br/> <br/> <br/> 
        <Container
      maxWidth="lg"
      sx={{
        width: '100%',
        maxWidth: '1476px',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0px 0px 4px 0px #DCE2ECCC',
        marginTop: '20px',
        boxSizing: 'border-box',
      }}

      >
        
      <Box sx={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2  }}>
        
        <Typography variant="h6" component="h2">
          פרטים טכניים
        </Typography>
  
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
     
            <Grid item>
              <TextField
                label="שם נושא"
                name="topicName"
                value={meeting.topicName}
                onChange={handleChange}
                error={!!validationErrors.topicName}
                helperText={validationErrors.topicName}
                margin="normal"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item>
              <TextField
                label="שם קורס"
                name="courseName"
                value={meeting.courseName}
                onChange={handleChange}
                error={!!validationErrors.courseName}
                helperText={validationErrors.courseName}
                margin="normal"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

   
            <Grid item>
              <TextField
                label="שם מרצה"
                name="lecturerName"
                value={meeting.lecturerName}
                onChange={handleChange}
                error={!!validationErrors.lecturerName}
                helperText={validationErrors.lecturerName}
                margin="normal"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>
    


            <Grid item>
              <TextField
                label="מספר חדר"
                name="roomId"
                value={meeting.roomId}
                onChange={handleChange}
                error={!!validationErrors.roomId}
                helperText={validationErrors.roomId}
                margin="normal"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>


             <Grid item>
              <TextField
                label="תאריך"
                name="date"
                type="date"
                value={meeting.date}
                onChange={handleChange}
                error={!!validationErrors.date}
                helperText={validationErrors.date}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item>
              <TextField
                label="שנה"
                name="year"
                value={meeting.year}
                onChange={handleChange}
                error={!!validationErrors.year}
                helperText={validationErrors.year}
                margin="normal"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

          

            <Grid item>
              <TextField
                label="שעת התחלה"
                name="startTime"
                type="time"
                value={meeting.startTime}
                onChange={handleChange}
                error={!!validationErrors.startTime}
                helperText={validationErrors.startTime}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item>
            <TextField
               label="שעת סיום"
               name="endTime"
               type="time"
               value={meeting.endTime}
              onChange={handleChange}
  error={!!validationErrors.endTime}
  helperText={validationErrors.endTime}
  margin="normal"
  required
  InputLabelProps={{ shrink: true }}
  variant="outlined"
  sx={textFieldStyle}
/>
</Grid>



                     
                    </Grid>

   
                </form>
            </Box>
        </Container>
        </>
    );
};

export default AddMeeting;