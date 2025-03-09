import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const AddMeeting = ({ isEdit, meetingData }) => {
  const [meeting, setMeeting] = useState({
    meetingId: meetingData?.meetingId || '',
    topicName: meetingData?.topicName || '',
    startTime: meetingData?.startTime || '',
    endTime: meetingData?.endTime || '',
    roomId: meetingData?.roomId || '',
    reason: meetingData?.reason || ''
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
    console.log(meeting);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEdit ? 'ערוך מפגש' : 'הוסף מפגש חדש'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="מספר מפגש"
            name="meetingId"
            type="number"
            value={meeting.meetingId}
            margin="normal"
            required
            disabled={true}
          />
          
          <TextField
            fullWidth
            label="שם נושא"
            name="topicName"
            value={meeting.topicName}
            onChange={handleChange}
            margin="normal"
            required
            disabled={true}
          />
          
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
          />
          
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
          />
          
          <TextField
            fullWidth
            label="מספר חדר"
            name="roomId"
            type="number"
            value={meeting.roomId}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="סיבה"
            name="reason"
            value={meeting.reason}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
            fullWidth
          >
            {isEdit ? 'עדכן מפגש' : 'הוסף מפגש'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddMeeting;
