import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
<<<<<<< HEAD
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { clearError, resetStatus } from '../features/meeting/meetingSlice';
import MeetingForm from './MeetingForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { fetchAllCourses } from '../features/course/courseActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import { fetchAllUsers } from '../features/user/userAction';
=======
import {
  EventBusy as EventBusyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

import { fetchAllMeetings, deleteMeetingAction } from '../features/meeting/meetingActions';
import CustomTable from './CustomTable';
import trash from '../assets/icons/trash.png';
import penToSquare from '../assets/icons/penToSquare.png';
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e

const MeetingTable = React.memo(({ onEdit  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meetings, status, error } = useSelector((state) => state.meeting);
<<<<<<< HEAD
  const [refreshKey, setRefreshKey] = useState(0);
=======

>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
<<<<<<< HEAD
  const courses = useSelector(state => state.course.courses|| []);
  const topics = useSelector(state => state.topic.topics|| []);
  const users = useSelector(state => state.user.user || []);
  const [statusOptions, setStatusOptions] = useState([]);

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
  

    useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchAllCourses()).unwrap();
        await dispatch(fetchAllTopic()).unwrap();
        await dispatch(fetchAllUsers()).unwrap();
        await dispatch(fetchAllTopic()).unwrap();
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (status === 'idle') {
      loadData();
    } else if (status === 'succeeded' || status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch]);
=======
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const columns = useMemo(() => [
    'מספר מפגש',
    'שם קורס',
    'נושא',
    'שם מרצה',
    'תאריך',
    'יום',
    'שעת התחלה',
    'שעת סיום',
    'מספר חדר',
    'שיבוץ',
    'סטטוס',
    'מחיקה',
    'עריכה',
  ], []);

  const keyMap = useMemo(() => ({
    'מספר מפגש': 'meetingId',
    'שם קורס': 'courseName',
    'נושא': 'topicName',
    'שם מרצה': 'teacherName',
    'תאריך': 'meetingDate',
    'יום': 'dayId',
    'שעת התחלה': 'startTime',
    'שעת סיום': 'endTime',
    'מספר חדר': 'roomId',
    'שיבוץ': 'isValid',
    'סטטוס': 'isPartOfSchedule',
  }), []);

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleManualRefresh = useCallback(() => {
    dispatch(fetchAllMeetings());
  }, [dispatch]);

  const handleDelete = useCallback((meeting) => {
    setMeetingToDelete(meeting);
    setOpenDeleteDialog(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    if (!isDeleting) {
      setOpenDeleteDialog(false);
      setMeetingToDelete(null);
    }
  }, [isDeleting]);

  const handleConfirmDelete = useCallback(async () => {
<<<<<<< HEAD
    if (meetingToDelete) {
      setIsDeleting(true);
      try {
        await dispatch(deleteMeetingAction(meetingToDelete.meetingId)).unwrap();
        showSnackbar('מפגש נמחק בהצלחה', 'success');
        await dispatch(fetchAllMeetings());
        setIsDeleting(false);
        handleCloseDeleteDialog();
      } catch (error) {
        setIsDeleting(false);
        showSnackbar('מחיקת מפגש נכשלה', 'error');
      }
    }
  }, [meetingToDelete, dispatch, showSnackbar, handleCloseDeleteDialog]);

  // עמודות הטבלה
  const columns = useMemo(() => [
    'שם קורס',
    'נושא',
    'מספר מפגש',
    'מרצה',
    'יום',
    'שעת התחלה',
    'שעת סיום',
    'תאריך',
    'חדר',
    'האם השיבוץ תקין?',
    'סטטוס',
    'חלק מהמערכת?',
    'עריכה',
    'מחיקה'
  ], []);

  // מיפוי המפתחות
  const keyMap = useMemo(() => ({
    'שם קורס': 'courseName',
    'נושא': 'topicName',
    'מספר מפגש': 'meetingNumberForTopic',
    'מרצה': 'teacherName',
    'יום': 'dayId',
    'שעת התחלה': 'startTime',
    'שעת סיום': 'endTime',
    'תאריך': 'date',
    'חדר': 'roomId',
    'האם השיבוץ תקין?': 'isValid',
    'סטטוס' : 'statusCourse',
    'חלק מהמערכת?': 'isPartOfSchedule',
    'מזהה מפגש': 'meetingId',
    'מזהה נושא': 'scheduleForTopicId'
  }), []);

  // פונקציות עזר לרינדור
  const renderScheduleChip = useCallback((row) => (
    <Chip
      label={row.isPartOfSchedule ? 'כן' : 'לא'}
      color={row.isPartOfSchedule ? 'success' : 'default'}
      variant="outlined"
    />
  ), []);

  const renderValidChip = useCallback((row) => (
    <Chip
      label={row.isValid ? 'V' : 'X'}
      color={row.isValid ? 'success' : 'error'}
      variant="outlined"
    />
  ), []);

  const renderEditButton = useCallback((row) => (
    <Tooltip title="ערוך מפגש">
      <IconButton 
        onClick={() => onEdit && onEdit(row)} 
        size="small" 
        color="primary"
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  ), [onEdit]);

  const renderDeleteButton = useCallback((row) => (
    <Tooltip title="מחק מפגש">
      <IconButton 
        onClick={() => handleDelete(row)} 
        size="small" 
        color="error"
      >
        <DeleteIcon />
=======
    if (!meetingToDelete) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteMeetingAction(meetingToDelete.meetingId)).unwrap();
      showSnackbar('מפגש נמחק בהצלחה', 'success');
      await dispatch(fetchAllMeetings());
      handleCloseDeleteDialog();
    } catch (error) {
      showSnackbar('מחיקת מפגש נכשלה', 'error');
    } finally {
      setIsDeleting(false);
    }
  }, [meetingToDelete, dispatch, showSnackbar, handleCloseDeleteDialog]);

  const renderStatusChip = useCallback((row) => {
    const meetingDate = new Date(row.meetingDate);
    const isActive = meetingDate >= new Date();

    return (
      <Chip
        label={isActive ? 'פעיל' : 'הסתיים'}
        sx={{
          width: 97,
          height: 39,
          borderRadius: '68.31px',
          backgroundColor: isActive ? '#DAF8E6' : '#E5E7EB80',
          color: isActive ? '#000' : '#666',
          fontSize: 14,
          fontWeight: 500,
        }}
      />
    );
  }, []);

  const renderValidChip = useCallback((row) => (
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 500,
        color: '#393939',
      }}
    >
      {row.isValid ? 'V' : 'X'}
    </Typography>
  ), []);

  const renderDeleteButton = useCallback((row) => (
    <Tooltip title="מחק מפגש">
      <IconButton
        onClick={() => handleDelete(row)}
        size="small"
        sx={{
          color: 'error.main',
          '&:hover': {
            backgroundColor: 'error.light',
            opacity: 0.1,
          },
        }}
      >
        <Box
          component="img"
          src={trash}
          alt="Delete"
          sx={{ width: 18, height: 18 }}
        />
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
      </IconButton>
    </Tooltip>
  ), [handleDelete]);

<<<<<<< HEAD
  // הגדרת העמודות המיוחדות
=======
  const renderEditButton = useCallback((row) => (
    <Tooltip title="ערוך מפגש">
      <IconButton
        onClick={() => onEdit?.(row)}
        size="small"
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.light',
            opacity: 0.1,
          },
        }}
      >
        <Box
          component="img"
          src={penToSquare}
          alt="Edit"
          sx={{ width: 18, height: 18 }}
        />
      </IconButton>
    </Tooltip>
  ), [onEdit]);

>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
  const columnConfig = useMemo(() => ({
    'סטטוס': { render: renderStatusChip },
    'שיבוץ': { render: renderValidChip },
    'מחיקה': { render: renderDeleteButton },
    'עריכה': { render: renderEditButton },
  }), [renderStatusChip, renderValidChip, renderDeleteButton, renderEditButton]);

<<<<<<< HEAD
  // רכיב טעינה
  const loadingComponent = useMemo(() => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">טוען מפגשים...</Typography>
    </Box>
  ), []);

  // רכיב שגיאה
  const errorComponent = useMemo(() => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
      <Typography variant="h6" color="error" textAlign="center">
        שגיאה בטעינת המפגשים
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {error}
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleManualRefresh} 
        startIcon={<RefreshIcon />} 
        size="large"
      >
        נסה שוב
      </Button>
    </Box>
  ), [error, handleManualRefresh]);
=======
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    } else if (status === 'succeeded' || status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch]);
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e

  if (isInitialLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          טוען מפגשים...
        </Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
          gap: 2,
        }}
      >
        <Typography variant="h6" color="error">
          שגיאה בטעינת המפגשים
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={handleManualRefresh}
          startIcon={<RefreshIcon />}
        >
          נסה שוב
        </Button>
      </Box>
    );
  }

  return (
<<<<<<< HEAD
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          טבלת מפגשים
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleManualRefresh} 
          startIcon={<RefreshIcon />} 
          disabled={status === 'loading'}
        >
          רענן
        </Button>
      </Box>

      <CustomTable 
        columns={columns} 
        data={meetings || []} 
        keyMap={keyMap} 
        columnConfig={columnConfig} 
=======
    <Box sx={{ width: '95%' , marginLeft: 'auto', marginRight:'auto',
  }}>
      <Box
        sx={{
          position: 'relative',
          top: -70,
          marginBottom: -10,
          textAlign: 'right',
          paddingBottom: 4,
          paddingRight: 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Rubik", sans-serif',
            fontWeight: 700,
            fontSize: { xs: 28, sm: 35, md: 40 },
            color: '#0D1783',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          מפגשים
        </Typography>
      </Box>

      <CustomTable
        columns={columns}
        data={meetings || []}
        keyMap={keyMap}
        columnConfig={columnConfig}
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
      />

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'right', fontWeight: 600 }}>
          מחיקת מפגש
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ textAlign: 'right', mb: 2 }}>
            האם אתה בטוח שברצונך למחוק את המפגש "{meetingToDelete?.topicName}" 
            מהקורס "{meetingToDelete?.courseName}"?
          </Typography>
          {meetingToDelete && !meetingToDelete.isValid && (
<<<<<<< HEAD
            <Box mt={2} display="flex" alignItems="center" color="error.main">
              <EventBusyIcon sx={{ mr: 1 }} />
              <Typography>המפגש מסומן כשגוי.</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog} 
            disabled={isDeleting} 
=======
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'error.main',
                mt: 2,
                justifyContent: 'flex-end',
              }}
            >
              <Typography sx={{ mr: 1 }}>
                המפגש מסומן כשגוי.
              </Typography>
              <EventBusyIcon />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start', gap: 1 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            disabled={isDeleting}
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
            color="inherit"
          >
            ביטול
          </Button>
<<<<<<< HEAD
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            color="error" 
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'מחק'}
=======
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            sx={{ minWidth: 80 }}
          >
            {isDeleting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'מחק'
            )}
>>>>>>> fb4bdcf319c0d5f4eb77ab2cd62ee6b75d73968e
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

MeetingTable.displayName = 'MeetingTable';

export default MeetingTable;