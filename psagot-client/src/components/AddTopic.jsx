import React, { useState, useEffect } from 'react';
import {
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    TextField, Typography, Grid, Paper, IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStatusesTopics } from '../features/status/statusActions';
import { fetchTeachers } from '../features/user/userAction';
import { fetchAllDays } from '../features/day/dayActions';
import { addTopicAction, updateTopicAction } from '../features/topic/topicActions';
import { addScheduleForTopicAction } from '../features/scheduleForTopic/scheduleForTopicActions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from "@mui/icons-material/Close";

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
    },
    ".css-5lvf42-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-5lvf42-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-5lvf42-MuiSelect-select-MuiInputBase-input-MuiInput-input":{
        marginRight: "unset"
    }
  };

const initialTechnicalDetails = {
    code: '',
    name: '',
    courseName: '',
    lecturer: '',
    startDate: '',
    endDate: '',
    status: '',
    sessions: '',
    equipment: {
        computers: false,
        projector: false,
        microphone: false
    }
};

const initialSchedule = [
    {
        day: '',
        startHour: '',
        endHour: '',
        roomFree: false
    }
];

export default function AddTopic({ open, onClose, courseName }) {
    const dispatch = useDispatch();
    const [technicalDetails, setTechnicalDetails] = useState(initialTechnicalDetails);
    const [schedule, setSchedule] = useState(initialSchedule);
    const [errorMessage, setErrorMessage] = useState('');
    const [startDateType, setStartDateType] = useState("text");
    const [endDateType, setEndDateType] = useState("text");
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [startHourError, setStartHourError] = useState('');
    const [endHourError, setEndHourError] = useState('');

    const teachers = useSelector(state => state.user.teachers);
    const topicsStatuses = useSelector(state => state.status.topicsStatuses);
    const days = useSelector(state => state.day.days);

    useEffect(() => {
        dispatch(fetchTeachers());
        dispatch(fetchAllStatusesTopics());
        dispatch(fetchAllDays());
    }, [dispatch]);
    useEffect(()=>{
    setTechnicalDetails({...technicalDetails,courseName:courseName})
    },[open])

    const handleTechnicalChange = (field, value) => {
        setTechnicalDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleEquipmentChange = (field) => {
        setTechnicalDetails(prev => ({
            ...prev,
            equipment: { ...prev.equipment, [field]: !prev.equipment[field] }
        }));
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index][field] = value;
        setSchedule(updatedSchedule);
    };

    const addScheduleRow = () => {
        setSchedule(prev => [...prev, { day: '', startHour: '', endHour: '', roomFree: false }]);
    };

    const handleSaveTechnicalDetails = () => {
        // בדיקות ואימותים לפני השמירה
        if(!setValidations())
            return;
        if (!technicalDetails.name || !technicalDetails.courseName) {
            setErrorMessage('אנא מלא את כל השדות הנדרשים.');
            return;
        }

        // שליחת הפעולה לשמירת פרטי הנושא  
            dispatch(addTopicAction(technicalDetails))
                .then(() => {
                    alert('שמירת פרטי הנושא הסתיימה בהצלחה.');
                    onClose();
                })
                .catch(() => {
                    setErrorMessage('אירעה שגיאה בשמירת פרטי הנושא.');
                });
    };

    const handleSaveSchedule = () => {
        // בדיקות חפיפות בזמנים ובימים
        const hasOverlap = checkForOverlaps(schedule);
        if (hasOverlap) {
            setErrorMessage('קיימת חפיפה בזמנים או בימים. אנא תקן את הנתונים.');
            return;
        }
        // שליחת הפעולה לשמירת ימי הלימוד
        dispatch(addScheduleForTopicAction(schedule))
            .then(() => {
                alert('שמירת ימי הנושא הסתיימה בהצלחה.');
                onClose();
            })
            .catch(() => {
                setErrorMessage('אירעה שגיאה בשמירת ימי הנושא.');
            });
    };

    const checkForOverlaps = (scheduleArray) => {
        // פונקציה לבדיקה אם קיימת חפיפה בזמנים ובימים
        for (let i = 0; i < scheduleArray.length; i++) {
            for (let j = i + 1; j < scheduleArray.length; j++) {
                if (scheduleArray[i].day === scheduleArray[j].day) {
                    const startA = scheduleArray[i].startHour;
                    const endA = scheduleArray[i].endHour;
                    const startB = scheduleArray[j].startHour;
                    const endB = scheduleArray[j].endHour;
                    if ((startA < endB) && (endA > startB)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const setValidations = () => {
        return startDateValidation() ||
        endDateValidation() ||
        startHourValidation() ||
        endHourValidation();
    };
    
    const startDateValidation = () => {
        const today = new Date();
        const startDate = new Date(technicalDetails.startDate);
        const endDate = new Date(technicalDetails.endDate);
    
        if (!technicalDetails.startDate) {
            setStartDateError('יש להזין תאריך התחלה.');
        } else if (startDate < today.setHours(0, 0, 0, 0)) {
            setStartDateError('תאריך ההתחלה צריך להיות גדול מהיום.');
        } else if (technicalDetails.endDate && startDate > endDate) {
            setStartDateError('תאריך ההתחלה צריך להיות קטן מתאריך הסיום.');
        } else {
            setStartDateError('');
            return true;
        }
        return false;
    };
    
    const endDateValidation = () => {
        const startDate = new Date(technicalDetails.startDate);
        const endDate = new Date(technicalDetails.endDate);
    
        if (!technicalDetails.endDate) {
            setEndDateError('יש להזין תאריך סיום.');
        } else if (technicalDetails.startDate && endDate <= startDate) {
            setEndDateError('תאריך הסיום צריך להיות אחרי תאריך ההתחלה.');
        } else {
            setEndDateError('');
            return true;
        }
        return false;    };
    
    const startHourValidation = () => {
        const now = new Date();
        const startDate = new Date(technicalDetails.startDate);
        const startHour = technicalDetails.startHour;
        const endHour = technicalDetails.endHour;
    
        if (!startHour) {
            setStartHourError('יש להזין שעת התחלה.');
            return false;
        }
    
        const [startH, startM] = startHour.split(':').map(Number);
        const startDateTime = new Date(startDate);
        startDateTime.setHours(startH, startM, 0, 0);
    
        if (startDate.toDateString() === now.toDateString() && startDateTime < now) {
            setStartHourError('שעת ההתחלה צריכה להיות מאוחרת מהשעה הנוכחית.');
        } else if (endHour) {
            const [endH, endM] = endHour.split(':').map(Number);
            const endDateTime = new Date(startDate);
            endDateTime.setHours(endH, endM, 0, 0);
    
            if (startDateTime >= endDateTime) {
                setStartHourError('שעת ההתחלה צריכה להיות לפני שעת הסיום.');
                return false;
            }
            setStartHourError('');
            return true;
        } else {
            setStartHourError('');
            return true;
        }
        return false;
    };
    
    const endHourValidation = () => {
        const startDate = new Date(technicalDetails.startDate);
        const startHour = technicalDetails.startHour;
        const endHour = technicalDetails.endHour;
    
        if (!endHour) {
            setEndHourError('יש להזין שעת סיום.');
            return;
        }
    
        if (startHour) {
            const [startH, startM] = startHour.split(':').map(Number);
            const [endH, endM] = endHour.split(':').map(Number);
    
            const startDateTime = new Date(startDate);
            const endDateTime = new Date(startDate);
            startDateTime.setHours(startH, startM, 0, 0);
            endDateTime.setHours(endH, endM, 0, 0);
    
            if (endDateTime <= startDateTime) {
                setEndHourError('שעת הסיום צריכה להיות אחרי שעת ההתחלה.');
                return;
            }
            setEndHourError('');
        } else {
            setEndHourError('');
        }
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
                    הוספת נושא {technicalDetails.name && `- ${technicalDetails.name}`}
                </Typography>
            </DialogTitle>

            <Box sx={{ width: '100%', height: '100%' }} dir="rtl">
                <DialogContent sx={{ maxHeight: '90vh', overflowY: 'unset' }} dir="rtl">
                    <Grid container spacing={2} direction="column">
                        {/* פרטים טכניים */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={-1} mb={1}>
                                    <Typography variant="h6" fontWeight="bold" fontSize={14} mb={2}>
                                        פרטים טכניים
                                    </Typography>
                                    <Box display="flex" gap={2} sx={{ justifyContent: 'center', px: 3, pb: 2 }}>
                                        <Typography sx={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Typography>
                                        <Button variant="contained" color="primary" onClick={handleSaveTechnicalDetails} sx={{ borderRadius: '32px' }}>
                                            שמירה
                                        </Button>
                                        {/* <Button variant='outlined' onClick={onClose} sx={{ borderRadius: '32px' }}>ביטול</Button> */}
                                    </Box>
                                </Box>

                                <Grid container spacing={2} sx={{ maxWidth: '80%' }}>
                                    {/* { <Grid item xs={4}>
                                        <TextField
                                            label="קוד נושא"
                                            value={technicalDetails.code}
                                            disabled
                                            fullWidth
                                            variant="standard"
                                            InputLabelProps={{ sx: { textAlign: 'right', right: 0 } }}
                                        />
                                    </Grid>} */}
                                    <Grid item xs={3}>
                                        <TextField
                                            label="שם נושא"
                                            value={technicalDetails.name}
                                            onChange={(e) => handleTechnicalChange('name', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            InputLabelProps={{ sx: { textAlign: 'right', right: 0 } }}
                                            sx={{ ...sharedStyles }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="שם קורס"
                                            value={technicalDetails.courseName}
                                            onChange={(e) => handleTechnicalChange('courseName', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            InputLabelProps={{ sx: { textAlign: 'right', right: 0 } }}
                                            sx={{ ...sharedStyles }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="standard"
                                            sx={{
                                                ...sharedStyles
                                            }}

                                        >
                                            <InputLabel>מרצה</InputLabel>
                                            <Select
                                                value={technicalDetails.lecturer}
                                                onChange={(e) => handleTechnicalChange('lecturer', e.target.value)}
                                                IconComponent={ExpandMoreRoundedIcon} // מחליף את החץ הרגיל
                                            >
                                                {teachers.map((user, ind) => (
                                                    <MenuItem key={ind} value={user.name}>
                                                        {user.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth variant="standard"
                                            sx={{
                                                ...sharedStyles
                                            }}
                                        >
                                            <InputLabel>סטטוס</InputLabel>
                                            <Select
                                                value={technicalDetails.status}
                                                onChange={(e) => handleTechnicalChange('status', e.target.value)}
                                                IconComponent={ExpandMoreRoundedIcon}
                                            >
                                                {topicsStatuses.map(s => (
                                                    <MenuItem key={s.statusTopicId} value={s.name}>
                                                        {s.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {/* <DatePicker
  label="תאריך התחלה"
  value={technicalDetails.startDate}
  onChange={(newValue) => handleTechnicalChange('startDate', newValue)}
  slots={{
    openPickerIcon: CalendarMonthIcon,
  }}
  slotProps={{
    textField: {
      fullWidth: true,
      variant: 'standard',
      InputLabelProps: {
        shrink: true,
        sx: {
          right: 0,
          left: 'unset',
          transformOrigin: 'top right',
          fontSize: '0.9rem',
        },
      },
      inputProps: {
        style: {
          direction: 'rtl',
          textAlign: 'right',
          fontSize: '0.95rem',
          paddingBottom: '4px',
        },
      },
      sx: {
        direction: 'rtl',
        '& .MuiInput-root:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        },
        '& .MuiInput-root': {
          paddingRight: 0,
        },
        '& .MuiInputAdornment-root': {
          marginRight: 'auto',
          marginLeft: 0,
        },
      },
    },
  }}
/> */}

                                        {/* <TextField
                                            label="תאריך התחלה"
                                            InputLabelProps={{ shrink: true }}
                                            value={technicalDetails.startDate}
                                            onChange={(e) => handleTechnicalChange('startDate', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                                sx: {
                                                    right: 0,
                                                    left: 'unset',
                                                    transformOrigin: 'top right',
                                                    fontSize: '0.9rem',
                                                },
                                            }}
                                            inputProps={{
                                                style: {
                                                    direction: 'rtl',
                                                    textAlign: 'right',
                                                    fontSize: '0.95rem',
                                                    paddingBottom: '4px',
                                                },
                                            }}
                                            sx={{
                                                direction: 'rtl',
                                                '& .MuiInput-root:before': {
                                                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                                                },
                                                '& .MuiInput-root': {
                                                    paddingRight: 0,
                                                },
                                            }}
                                        /> */}
                                        <TextField
                                                      label="תאריך התחלה"
                                                      name="startDate"
                                                      type={startDateType}
                                                      onFocus={() => setStartDateType("date")}
                                                      onBlur={() => !technicalDetails.startDate && setStartDateType("text")}
                                                      value={technicalDetails.startDate}
                                                      onChange={(e) => handleTechnicalChange('startDate', e.target.value)}
                                                      variant="standard"
                                                      fullWidth
                                                      sx={{ ...sharedStyles }}
                                                    />
                                    </Grid>
                                    <Grid item xs={3}>
                                        {/* <TextField
                                            label="תאריך סיום"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={technicalDetails.endDate}
                                            onChange={(e) => handleTechnicalChange('endDate', e.target.value)}
                                            variant="standard"
                                            /> */}
                                         <TextField
                                                      label="תאריך סיום"
                                                      name="endDate"
                                                      type={endDateType}
                                                      onFocus={() => setEndDateType("date")}
                                                      onBlur={() => !technicalDetails.endDate && setEndDateType("text")}
                                                      value={technicalDetails.endDate}
                                                      onChange={(e) => handleTechnicalChange('endDate', e.target.value)}
                                                      variant="standard"
                                                      fullWidth
                                                      sx={{ ...sharedStyles }}
                                                    />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            label="מספר מפגשים"
                                            type="number"
                                            value={technicalDetails.sessions}
                                            onChange={(e) => handleTechnicalChange('sessions', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            InputLabelProps={{ sx: { textAlign: 'right', right: 0 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <Typography fontWeight="bold" fontSize={14} mb={1}>
                                                ציוד נדרש:
                                            </Typography>
                                            <Box display="flex" gap={2} alignItems="center">
                                                <Checkbox
                                                    checked={technicalDetails.equipment.computers}
                                                    onChange={() => handleEquipmentChange('computers')}
                                                />
                                                <Typography component="span">מחשבים</Typography>
                                                <Checkbox
                                                    checked={technicalDetails.equipment.projector}
                                                    onChange={() => handleEquipmentChange('projector')}
                                                />
                                                <Typography component="span">מקרן</Typography>
                                                <Checkbox
                                                    checked={technicalDetails.equipment.microphone}
                                                    onChange={() => handleEquipmentChange('microphone')}
                                                />
                                                <Typography component="span">מיקרופון</Typography>
                                            </Box>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* ימי לימוד */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" fontWeight="bold" fontSize={14}>
                                    ימי לימוד
                                </Typography>
                                {schedule.map((row, index) => (
                                    <Grid container spacing={2} key={index} alignItems="center" sx={{ mt: 1 }}>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth variant="standard"
                                                sx={{
                                                    direction: 'rtl',
                                                    '& .MuiInputLabel-root': {
                                                        right: 0,
                                                        left: 'unset',
                                                        fontSize: '0.9rem',
                                                    },
                                                    '& .MuiSelect-select': {
                                                        textAlign: 'right',
                                                        paddingRight: '0px',
                                                    },
                                                    '& .MuiInput-root': {
                                                        fontSize: '0.95rem',
                                                        paddingBottom: '4px',
                                                    },
                                                    '& .MuiSelect-icon': {
                                                        left: 0, // החץ בצד שמאל
                                                        right: 'unset',
                                                    },
                                                }}>
                                                <InputLabel>יום</InputLabel>
                                                <Select
                                                    value={row.day}
                                                    onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                                                    IconComponent={ExpandMoreRoundedIcon}
                                                >
                                                    {days.map((day, ind) => (
                                                        <MenuItem key={ind} value={day.name}>
                                                            {day.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                label="שעת התחלה"
                                                type="time"
                                                InputLabelProps={{ shrink: true }}
                                                value={row.startHour}
                                                onChange={(e) => handleScheduleChange(index, 'startHour', e.target.value)}
                                                onBlur={() => startHourValidation()}
                                                error={startHourError?.length>0}
                                                helperText={startHourError}
                                                fullWidth
                                                variant="standard"
                                                sx={{ ...sharedStyles }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                label="שעת סיום"
                                                type="time"
                                                InputLabelProps={{ shrink: true }}
                                                value={row.endHour}
                                                onChange={(e) => handleScheduleChange(index, 'endHour', e.target.value)}
                                                fullWidth
                                                variant="standard"
                                                sx={{ ...sharedStyles }}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl>
                                                <Box display="flex" alignItems="center">
                                                    <Checkbox
                                                        checked={row.roomFree}
                                                        onChange={() =>
                                                            handleScheduleChange(index, 'roomFree', !row.roomFree)
                                                        }
                                                    />
                                                    <Typography component="span">חדר פנוי</Typography>
                                                </Box>
                                            </FormControl>
                                        </Grid>
                                        <Button variant="contained" color="primary" sx={{ borderRadius: '32px' }} onClick={handleSaveSchedule}>
                                            שמירה
                                        </Button>
                                    </Grid>
                                ))}
                                <Box flex sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                    <IconButton color="primary" aria-label="add to shopping cart" onClick={addScheduleRow}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                    <Typography >הוספת יום לימוד</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>

                {/* כפתורים */}
                {/* <DialogActions sx={{ flexDirection: 'column' }}> */}

                {/* </DialogActions> */}
            </Box>
        </Dialog>
    );
}
