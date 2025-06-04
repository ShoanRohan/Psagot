import React, { useState, useEffect } from 'react';
import {
  TextField, MenuItem, Button, Grid, Typography, Box, Select, InputLabel, FormControl,
} from '@mui/material';
import '../styles/MeetingForm.css';
import { addMeeting, updateMeeting } from '../utils/meetingUtil';

const MeetingForm = ({ mode = 'add', meetingData = {}, onSave, onCancel }) => {
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    meetingNumber: '',
    topicName: '',
    courseName: '',
    lecturerName: '',
    date: '',
    year: '',
    startTime: '',
    endTime: '',
    semester: '',
    recording: '',
    correctAssignment: '',
    reason: ''
  });

  useEffect(() => {
    if (isEditMode && meetingData) {
      setFormData({ ...formData, ...meetingData });
    }
  }, [meetingData]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        const updated = await updateMeeting(formData);
        onSave(updated);
      } else {
        const added = await addMeeting(formData);
        onSave(added);
      }
    } catch (err) {
      console.error('שגיאה בשמירה:', err);
      alert('אירעה שגיאה בשמירת המפגש');
    }
  };

  return (
    <Box className="meeting-form-wrapper" dir="rtl">
      <Box className="meeting-form-header">
        <Box>
          <Typography variant="h4" className="main-title">מפגשים</Typography>
          <Typography className="subtitle">מפגשים / פרטי מפגש</Typography>
        </Box>
        <Box className="buttons-group">
          <Button variant="contained" className="rounded-button" onClick={handleSave}>שמור</Button>
          <Button variant="outlined" className="rounded-button" onClick={onCancel}>ביטול</Button>
        </Box>
      </Box>

      <Box className="form-box">
        <Typography className="section-title">פרטים טכניים</Typography>

        <Grid container spacing={3} className="fields-grid">
          <Grid item xs={3}>
            <TextField fullWidth label="מספר מפגש" variant="standard" value={formData.meetingNumber} onChange={handleChange('meetingNumber')} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="שם נושא" variant="standard" value={formData.topicName} onChange={handleChange('topicName')} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="שם קורס" variant="standard" value={formData.courseName} onChange={handleChange('courseName')} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="שם מרצה" variant="standard" value={formData.lecturerName} onChange={handleChange('lecturerName')} />
          </Grid>

          <Grid item xs={3}>
            <TextField fullWidth label="תאריך" type="date" variant="standard" InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange('date')} />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שנה</InputLabel>
              <Select className="select-left-arrow" value={formData.year} onChange={handleChange('year')}>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שעת התחלה</InputLabel>
                <Select className="select-left-arrow" fullWidth   variant="standard"  value={formData.startTime} onChange={handleChange('startTime')} />
             </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שעת סיום</InputLabel>
               <Select fullWidth className="select-left-arrow"  variant="standard"  value={formData.endTime} onChange={handleChange('endTime')} />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>סמסטר</InputLabel>
              <Select className="select-left-arrow" value={formData.semester} onChange={handleChange('semester')}>
                <MenuItem value="א">א</MenuItem>
                <MenuItem value="ב">ב</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>סטטוס</InputLabel>
              <Select className="select-left-arrow" value={formData.recording} onChange={handleChange('recording')}>
                <MenuItem value="כן">כן</MenuItem>
                <MenuItem value="לא">לא</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שיבוץ תקין</InputLabel>
              <Select className="select-left-arrow"value={formData.correctAssignment} onChange={handleChange('correctAssignment')}>
                <MenuItem value="כן">כן</MenuItem>
                <MenuItem value="לא">לא</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          
        </Grid>
       <Grid item xs={6} >
  <TextField
    label="סיבה"
    variant="standard"
    multiline
    rows={2}
    fullWidth
    value={formData.reason}
    onChange={handleChange('reason')}
    sx={{
      width: '424px',
      '& .MuiInputBase-inputMultiline': {
        textAlign: 'right',
        direction: 'rtl',
      }
    }}
  />
</Grid>

        </Box>
      </Box>
   
  );
};

export default MeetingForm;
