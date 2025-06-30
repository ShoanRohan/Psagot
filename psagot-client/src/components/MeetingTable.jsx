import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
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
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  EventBusy as EventBusyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

import { fetchAllMeetings, deleteMeetingAction } from '../features/meeting/meetingActions';
import { clearError, resetStatus } from '../features/meeting/meetingSlice';
import CustomTable from './CustomTable';
import trash from '../assets/icons/trash.png';
import penToSquare from '../assets/icons/penToSquare.png';

const MeetingTable = React.memo(({ onEdit }) => {
  // Redux state
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);

  // Local state
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Table configuration
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

  // Event handlers
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
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

  // Render functions for table cells
  const renderStatusChip = useCallback((row) => (
    <Chip
      label={row.isPartOfSchedule ? 'פעיל' : 'הסתיים'}
      sx={{
        width: 97,
        height: 39,
        borderRadius: '68.31px',
        backgroundColor: row.isPartOfSchedule ? '#DAF8E6' : '#E5E7EB80',
        color: row.isPartOfSchedule ? '#000' : '#666',
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          backgroundColor: row.isPartOfSchedule ? '#DAF8E6' : '#E5E7EB80',
        },
      }}
    />
  ), []);

  const renderValidChip = useCallback((row) => (
   <Typography
  sx={{
    fontSize: 14,
    fontWeight: 500,
    color: '#393939', // רק צבע הטקסט
    backgroundColor: 'transparent',
  }}
>

      {row.isValid ? 'V' : 'X'}
    </Typography>
  ), []);

  const renderDeleteButton = useCallback((row) => (
    <Tooltip title="מחק מפגש" placement="top">
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
          sx={{
            width: 20,
            height: 20,
          }}
        />
      </IconButton>
    </Tooltip>
  ), [handleDelete]);

  const renderEditButton = useCallback((row) => (
    <Tooltip title="ערוך מפגש" placement="top">
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
          sx={{
            width: 20,
            height: 20,
          }}
        />
      </IconButton>
    </Tooltip>
  ), [onEdit]);

  const columnConfig = useMemo(() => ({
    'סטטוס': { render: renderStatusChip },
    'שיבוץ': { render: renderValidChip },
    'מחיקה': { render: renderDeleteButton },
    'עריכה': { render: renderEditButton },
  }), [renderStatusChip, renderValidChip, renderDeleteButton, renderEditButton]);

  // Effects
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    } else if (status === 'succeeded' || status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch]);

  // Loading state
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

  // Error state
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
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Page Title */}
      <Box
        sx={{
          position: 'relative',
          top: -24,
          marginBottom: -10,
          textAlign: 'right',
          backgroundColor: 'transparent',
          zIndex: 10,
          paddingBottom: 15,
          paddingRight: 20,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Rubik", sans-serif',
            fontWeight: 700,
            fontSize: { xs: 28, sm: 35, md: 40 },
            lineHeight: '100%',
            color: '#0D1783',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            margin: 0,
            display: 'inline-block',
          }}
        >
          מפגשים
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
        }}
      >
        <CustomTable
          columns={columns}
          data={meetings || []}
          keyMap={keyMap}
          columnConfig={columnConfig}
          onEdit={onEdit}
          onDelete={handleDelete}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              textAlign: 'right',
              fontWeight: 600,
            }}
          >
            מחיקת מפגש
          </DialogTitle>
          <DialogContent dividers>
            <Typography sx={{ textAlign: 'right', mb: 2 }}>
              האם אתה בטוח שברצונך למחוק את המפגש "{meetingToDelete?.topicName}" 
              מהקורס "{meetingToDelete?.courseName}"?
            </Typography>
            {meetingToDelete && !meetingToDelete.isValid && (
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
          <DialogActions
            sx={{
              justifyContent: 'flex-start',
              gap: 1,
            }}
          >
            <Button
              onClick={handleCloseDeleteDialog}
              disabled={isDeleting}
              color="inherit"
            >
              ביטול
            </Button>
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
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
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
      </Paper>
    </Box>
  );
});

MeetingTable.displayName = 'MeetingTable';

export default MeetingTable;
