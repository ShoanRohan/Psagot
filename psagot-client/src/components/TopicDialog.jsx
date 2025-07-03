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
  Grid,
  Box,
  IconButton,
  Button,
  Typography,
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

const sharedStyles = {
  textAlign: "right",
  direction: "rtl",
  "& .MuiInputLabel-root": {
    right: "0",
    transformOrigin: "top right",
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "0px",
  }
};

const TopicDialog = ({ open, onClose, initialData }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.user || []);
  const statuses = useSelector(state => state.course.courseStatuses || []);
  const lecturers = useSelector(state => state.user.lecturers || []);

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

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchCourseStatuses());
    dispatch(fetchLecturers());
  }, [dispatch]);

  const handleChange = field => event => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleCheckboxChange = (key, checked) => {
    setForm((prevForm) => ({
      ...prevForm,
      equipment: {
        ...prevForm.equipment,
        [key]: checked
      }
    }));
  };

  const handleDateChange = field => date => {
    setForm({ ...form, [field]: date });
  };

  const handleSave = () => {
    const original = {
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
      schedule: initialData?.schedule || []
    };

    const changedFields = {};

    // השוואת שדות פשוטים
    Object.keys(form).forEach(key => {
      if (key === 'equipment' || key === 'schedule') return; // נטפל בהם בנפרד
      if (dayjs(form[key]).isValid() && dayjs(original[key]).isValid()) {
        if (!dayjs(form[key]).isSame(original[key])) {
          changedFields[key] = form[key]?.toISOString?.() ?? form[key];
        }
      } else if (form[key] !== original[key]) {
        changedFields[key] = form[key];
      }
    });

    // השוואת ציוד (equipment)
    const changedEquipment = {};
    Object.keys(form.equipment).forEach(eq => {
      if (form.equipment[eq] !== original.equipment[eq]) {
        changedEquipment[eq] = form.equipment[eq];
      }
    });
    if (Object.keys(changedEquipment).length > 0) {
      changedFields.equipment = changedEquipment;
    }

    // השוואת לוח זמנים
    if (JSON.stringify(form.schedule) !== JSON.stringify(original.schedule)) {
      changedFields.schedule = form.schedule;
    }

    if (Object.keys(changedFields).length === 0) {
      onClose(); // לא השתנה כלום
      return;
    }

    // שליחת הנתונים ששונו בלבד
    dispatch(updateTopicAction({
      id: initialData.id,
      ...changedFields
    }))
      .unwrap()
      .then(() => onClose())
      .catch((error) => console.error('Error updating topic:', error));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{
      sx: {
        width: '80vw',
        maxWidth: '80vw',
        borderRadius: 3,
        m: 'auto',
      },
    }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "#494747",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography fontWeight="bold" fontSize={16}>
          עריכת נושא{form.topicName ? ` - ${form.topicName}` : ''}
        </Typography>
      </DialogTitle>
      <Box sx={{ width: '100%', height: '100%' }} dir="rtl">
        <DialogContent sx={{ maxHeight: '90vh' }} dir="rtl">
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={-1} mb={1}>
                  <Typography variant="h6" fontWeight="bold" fontSize={14} mb={2}>
                    פרטים טכניים
                  </Typography>
                  <Box display="flex" gap={2} sx={{ justifyContent: 'center', px: 3, pb: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ borderRadius: '32px' }}>
                      שמירה
                    </Button>
                  </Box>
                </Box>
                <Grid container spacing={2} sx={{ maxWidth: '80%' }}>
                  <Grid item xs={3}>
                    <TextField
                      label="נושא"
                      value={form.topicName}
                      onChange={handleChange('topicName')}
                      fullWidth
                      variant="standard"
                      InputLabelProps={{ sx: { textAlign: 'right', right: 0 } }}
                      sx={{ ...sharedStyles }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth variant="standard" sx={{ ...sharedStyles }}>
                      <InputLabel>שם מרצה</InputLabel>
                      <Select
                        value={form.lecturerId}
                        onChange={handleChange('lecturerId')}
                      >
                        {lecturers.map(user => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2} sx={{ maxWidth: '80%' }}>
                    <Grid item xs={3}>
                      <DatePicker
                        label="תאריך התחלה"
                        value={form.startDate}
                        onChange={handleDateChange('startDate')}
                        slotProps={{
                          textField: {
                            variant: 'standard',
                            fullWidth: true,
                            sx: sharedStyles
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <DatePicker
                        label="תאריך סיום"
                        value={form.endDate}
                        onChange={handleDateChange('endDate')}
                        slotProps={{
                          textField: {
                            variant: 'standard',
                            fullWidth: true,
                            sx: sharedStyles
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <Grid container spacing={2} sx={{ maxWidth: '80%' }}>
                  <Grid item xs={3}>
                    <TextField
                      label="מספר מפגשים"
                      type="number"
                      value={form.numberOfSessions}
                      onChange={handleChange('numberOfSessions')}
                      fullWidth
                      variant="standard"
                      InputLabelProps={{ sx: { textAlign: 'right', right: 0 } }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth variant="standard" sx={{ ...sharedStyles }}>
                      <InputLabel >סטטוס</InputLabel>
                      <Select
                        value={form.statusId}
                        onChange={handleChange('statusId')}
                      >
                        {statuses.map(status => (
                          <MenuItem key={status.statusTopicId} value={status.name}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ maxWidth: '80%' }}>
                  <Grid item xs={12}>
                    <FormControl>
                      <Typography fontWeight="bold" fontSize={14} mb={1}>
                        ציוד נדרש:
                      </Typography>
                      <Box display="flex" gap={2} alignItems="center">
                        <Checkbox
                          checked={form.equipment.computers}
                          onChange={(e) => handleCheckboxChange('computers', e.target.checked)}
                        />
                        <Typography component="span">מחשבים</Typography>
                        <Checkbox
                          checked={form.equipment.projector}
                          onChange={(e) => handleCheckboxChange('projector', e.target.checked)}
                        />
                        <Typography component="span">מקרן</Typography>
                        <Checkbox
                          checked={form.equipment.microphone}
                          onChange={(e) => handleCheckboxChange('microphone', e.target.checked)}
                        />
                        <Typography component="span">מיקרופון</Typography>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default TopicDialog;