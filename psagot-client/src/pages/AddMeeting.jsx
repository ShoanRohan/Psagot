import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addMeetingAction } from '../features/meeting/meetingActions';
import { useNavigate } from 'react-router-dom';

const AddMeeting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState({
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

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting((prev) => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
    Object.keys(requiredFields).forEach((field) => {
      if (!meeting[field]) {
        errors[field] = `${requiredFields[field]} - שדה חובה`;
      }
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(addMeetingAction(meeting))
        .then((response) => {
          console.log('המפגש נשמר בהצלחה:', response);
          alert('המפגש נוסף בהצלחה למערכת!');
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
        })
        .catch(() => {
          alert('שגיאה בשמירת המפגש במערכת');
        });
    }
  };

  const textFieldStyle = {
    width: 200,
    height: 45,
    '& .MuiInputBase-root': {
      height: 45
    },
    '& .MuiOutlinedInput-root': {
      height: 45,
      '& fieldset': {
        borderBottom: '1px solid #C6C6C6',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0
      },
      '&:hover fieldset': {
        borderBottom: '1px solid #C6C6C6'
      },
      '&.Mui-focused fieldset': {
        borderBottom: '1px solid #C6C6C6'
      }
    }
  };

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
      backgroundColor: '#326DEF'
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 2 }}>
        <Button variant="outlined" onClick={handleCancel} sx={cancelButtonStyle}>
          ביטול
        </Button>
        <Button variant="contained" onClick={handleSaveMeeting} sx={saveButtonStyle}>
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
            {[
              { name: 'topicName', label: 'שם נושא' },
              { name: 'courseName', label: 'שם קורס' },
              { name: 'lecturerName', label: 'שם מרצה' },
              { name: 'roomId', label: 'מספר חדר' },
              { name: 'date', label: 'תאריך', type: 'date' },
              { name: 'year', label: 'שנה' },
              { name: 'startTime', label: 'שעת התחלה', type: 'time' },
              { name: 'endTime', label: 'שעת סיום', type: 'time' }
            ].map((field) => (
              <Grid item key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  value={meeting[field.name]}
                  onChange={handleChange}
                  error={!!validationErrors[field.name]}
                  helperText={validationErrors[field.name]}
                  InputLabelProps={field.type ? { shrink: true } : {}}
                  variant="outlined"
                  sx={textFieldStyle}
                  required
                />
              </Grid>
            ))}
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddMeeting;
