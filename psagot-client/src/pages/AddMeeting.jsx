import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';

const AddMeeting = () => {
  const [meeting, setMeeting] = useState({
    meetingId: '1234', // מספר מפגש מוגדר מראש
    topicName: '',
    courseName: '',
    lecturerName: '',
    startTime: '',
    endTime: '',
    roomId: '',  
    year: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New meeting added:', meeting);
  };

  return (
    <Container maxWidth={false} sx={{ width: 1476, height: 434, position: 'relative', top: 163, left: 85, borderRadius: 2, padding: '20px 30px 40px 30px', gap: '32px', backgroundColor: '#fff' }}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          פרטים טכניים
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Meeting ID */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="מספר מפגש"
                name="meetingId"
                type="number"
                value={meeting.meetingId}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{ readOnly: true }}
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Topic Name */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="שם נושא"
                name="topicName"
                value={meeting.topicName}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Course Name */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="שם קורס"
                name="courseName"
                value={meeting.courseName}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Lecturer Name */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="שם מרצה"
                name="lecturerName"
                value={meeting.lecturerName}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Date */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="תאריך"
                name="date"
                type="date"
                value={meeting.date}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Year */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="שנה"
                name="year"
                value={meeting.year}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Start Time */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="שעת התחלה"
                name="startTime"
                type="time"
                value={meeting.startTime}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* End Time */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="שעת סיום"
                name="endTime"
                type="time"
                value={meeting.endTime}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>

            {/* Room Number (New Field) */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="מספר חדר"
                name="roomId"
                type="number"
                value={meeting.roomId}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ borderBottom: '1px solid #C6C6C6' }}
              />
            </Grid>
          </Grid>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
          >
            הוסף מפגש
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddMeeting;
