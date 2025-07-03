import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  IconButton,
  Button,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, fetchLecturers } from '../features/user/userAction';
import { fetchCourseStatuses } from '../features/course/courseActions';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { updateTopicAction } from '../features/topic/topicActions';


const styles = {
  dialogContainer: {
    borderRadius: '10px',
    p: 3,
    backgroundColor: '#fff',
    fontFamily: 'Rubik',
    input: { fontFamily: 'Rubik', fontSize: '0.7vw' },
  },
  paperProps: {
    width: '80%',
    maxWidth: '1000px',
    margin: 'auto',
    borderRadius: '10px',
    padding: '40px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
    outline: '1px solid #C6C6C6',
    outlineOffset: '-1px',
    overflow: 'visible',
    fontFamily: 'Rubik',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'capitalize',
    color: '#393939',
    mb: 2
  },
  fieldBox: {
    mb: 2
  },
  textField: {
    fontFamily: 'Rubik',
    input: { fontFamily: 'Rubik', fontSize: '0.7vw' },
    '& label.Mui-focused': {
      color: '#326DEF'
    },
    '& .MuiInputLabel-root': {
      right: '0',
      transformOrigin: 'top right',
      fontFamily: 'Rubik'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#C6C6C6'
      },
      '&:hover fieldset': {
        borderColor: '#326DEF'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#326DEF'
      }
    }
  },
  saveButton: {
    height: 44,
    px: 3,
    backgroundColor: '#326DEF',
    borderRadius: 50,
    color: 'white',
    fontFamily: 'Rubik',
    fontWeight: 400,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#274bb5'
    }
  },
  cancelButton: {
    height: 44,
    px: 3,
    borderRadius: 50,
    border: '1px solid #326DEF',
    color: '#1E53CB',
    fontFamily: 'Rubik',
    fontWeight: 400,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'rgba(50, 109, 239, 0.1)'
    }
  }
};

const TopicDialog = ({ open, onClose, initialData }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.user || []);
  const statuses = useSelector(state => state.course.courseStatuses || []);
  const weekdays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

  const [form, setForm] = useState({
    topicCode: initialData?.topicCode || '',
    topicName: initialData?.topicName || '',
    courseName: initialData?.courseName || '',
    lecturerId: initialData?.lecturerId || '',
    startDate: initialData?.startDate ? dayjs(initialData.startDate) : null,
    endDate: initialData?.endDate ? dayjs(initialData.endDate) : null,
    statusId: initialData?.statusId || '',
    numberOfSessions: initialData?.numberOfSessions || '',
    equipment: {
      computers: initialData?.equipment?.computers || false,
      projector: initialData?.equipment?.projector || false,
      microphone: initialData?.equipment?.microphone || false
    },
    schedule: initialData?.schedule?.length > 0 ? initialData.schedule : [{ day: '', startTime: '', endTime: '' }]
  });
  ;

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchCourseStatuses());
    dispatch(fetchLecturers());
  }, [dispatch]);

  const lecturers = useSelector(state => state.user.lecturers || []);
  const handleChange = field => event => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleCheckboxChange = key => event => {
    setForm({
      ...form,
      equipment: {
        ...form.equipment,
        [key]: event.target.checked
      }
    });
  };

  const handleDateChange = field => date => {
    setForm({ ...form, [field]: date });
  };

  const handleScheduleChange = (index, field) => event => {
    const newSchedule = [...form.schedule];
    newSchedule[index][field] = event.target.value;
    setForm({ ...form, schedule: newSchedule });
  };

  const handleAddScheduleRow = () => {
    setForm({
      ...form,
      schedule: [...form.schedule, { day: '', startTime: '', endTime: '' }]
    });
  };

  const handleSave = () => {
    const topicToUpdate = {
      id: initialData.id, // חשוב! לוודא שקיים
      topicCode: form.topicCode,
      topicName: form.topicName,
      courseName: form.courseName,
      lecturerId: form.lecturerId,
      startDate: form.startDate ? form.startDate.toISOString() : null,
      endDate: form.endDate ? form.endDate.toISOString() : null,
      statusId: form.statusId,
      numberOfSessions: form.numberOfSessions,
      equipment: form.equipment,
      schedule: form.schedule
    };

    dispatch(updateTopicAction(topicToUpdate))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error updating topic:', error);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Paper sx={styles.dialogContainer} dir="rtl">

      <Dialog open={open} onClose={onClose} PaperProps={{ sx: styles.paperProps }}
      >
        <Box sx={styles.headerRow}>
          <DialogTitle>  עריכת נושא{form.topicName ? ` - ${form.topicName}` : ''} </DialogTitle>
          <Box display="flex" gap={1} alignItems="center">
            <Button onClick={handleCancel} sx={styles.cancelButton}>ביטול</Button>
            <Button onClick={handleSave} sx={styles.saveButton}>שמור</Button>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
          </Box>
        </Box>

        <DialogContent>
          <Typography sx={styles.sectionTitle}>פרטים טכניים</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="קוד נושא" value={form.topicCode} disabled fullWidth sx={styles.textField} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="שם נושא" value={form.topicName} onChange={handleChange('topicName')} fullWidth sx={styles.textField} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="שם קורס" value={form.courseName} onChange={handleChange('courseName')} fullWidth sx={styles.textField} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>שם מרצה</InputLabel>
                <Select value={form.lecturerId} onChange={handleChange('lecturerId')} label="שם מרצה">
                  {lecturers.map(user => (
                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="תאריך התחלה" value={form.startDate} onChange={handleDateChange('startDate')} slotProps={{ textField: { fullWidth: true, sx: styles.textField } }} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="תאריך סיום" value={form.endDate} onChange={handleDateChange('endDate')} slotProps={{ textField: { fullWidth: true, sx: styles.textField } }} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>סטטוס</InputLabel>
                <Select value={form.statusId} onChange={handleChange('statusId')} label="סטטוס">
                  {statuses.map(status => (
                    <MenuItem key={status.statusCourseId} value={status.statusCourseId}>{status.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="מספר מפגשים" type="number" value={form.numberOfSessions} onChange={handleChange('numberOfSessions')} fullWidth sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={3}>
                <FormControlLabel control={<Checkbox checked={form.equipment.computers} onChange={handleCheckboxChange('computers')} />} label="מחשבים" />
                <FormControlLabel control={<Checkbox checked={form.equipment.projector} onChange={handleCheckboxChange('projector')} />} label="מקרן" />
                <FormControlLabel control={<Checkbox checked={form.equipment.microphone} onChange={handleCheckboxChange('microphone')} />} label="מיקרופון" />
              </Box>
            </Grid>

            {/* שיבוץ במערכת */}
            <Grid item xs={12}>
              <Box mt={2} p={2} border="1px solid #ccc" borderRadius="8px">
                <Typography variant="h6" gutterBottom>שיבוץ במערכת</Typography>
                {form.schedule.map((row, index) => (
                  <Grid container spacing={2} alignItems="center" key={index} mt={1}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>יום</InputLabel>
                        <Select value={row.day} onChange={handleScheduleChange(index, 'day')} label="יום">
                          {weekdays.map(day => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="שעת התחלה" type="time" value={row.startTime} onChange={handleScheduleChange(index, 'startTime')} fullWidth sx={styles.textField} />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="שעת סיום" type="time" value={row.endTime} onChange={handleScheduleChange(index, 'endTime')} fullWidth sx={styles.textField} />
                    </Grid>
                  </Grid>
                ))}
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" sx={styles.saveButton} onClick={handleAddScheduleRow}>+ שיבוץ</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </Paper>
  );
};

export default TopicDialog;
