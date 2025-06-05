import React, { useState, useEffect } from 'react';
import { Button, IconButton, Box, CircularProgress, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MeetingForm from './MeetingForm';
import {useDispatch, useSelector } from 'react-redux';
import { clearError, resetStatus } from '../features/meeting/meetingSlice';


const MeetingButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [initialMeeting, setInitialMeeting] = useState(null);
  const { isLoading, error } = useSelector((state) => state.meeting);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  
  const dispatch = useDispatch();

  const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
 

  const exampleMeeting = {
    meetingId: '',
    scheduleForTopicId: null,
    meetingNumberForTopic: 1,
    year: '',
    roomId: '',
    isValid: true,
    startTime: '',
    endTime: '',
    meetingDate: '', 
    dayId: null,
    courseId: '',
    courseName: '', 
    topicId: '',
    topicName: '', 
    teacherId: '',
    teacherName: '',
    reason: null,
    statusCourseId: 0,
    isPartOfSchedule: false
  };



  const users = useSelector((state) => state.user.users);
  const canEdit = true; // 👈 זמני! לבדיקת עיצוב בלבד

  //const canEdit = [1,2,3,4].includes(currentUser?.userTypeId);

  const handleAddMeeting = () => {
    dispatch(clearError());
    dispatch(resetStatus());
    setIsEditMode(false);
    setInitialMeeting(exampleMeeting);
    setIsFormVisible(true);
  };

  const handleEditMeeting = () => {
    dispatch(clearError());
    dispatch(resetStatus());
    setIsEditMode(true);
    setInitialMeeting(exampleMeeting);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    dispatch(clearError());
    dispatch(resetStatus());
  };

 const handleSave = async (addedMeeting) => { // זה יהיה addedMeeting מהשרת
    try {
        console.log("Meeting saved successfully:", addedMeeting);
        showSnackbar('המפגש נשמר בהצלחה!');
        setIsFormVisible(false);
    } catch (error) {
        console.error('שגיאה בשמירת מפגש (מתוך MeetingButton):', error);
        showSnackbar('שגיאה בשמירת המפגש: אנא בדוק את הפרטים ונסה שוב.');
    }
};

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddMeeting}
        disabled={isLoading}
        sx={{ borderRadius: '50px', mt: 2 }}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
      >
        
        {isLoading ? 'שומר...' : 'הוספת מפגש'}
      </Button>

      {canEdit && (
        <IconButton
          aria-label="עריכת מפגש"
          onClick={handleEditMeeting}
          disabled={isLoading}
        >
          <EditIcon color="action" />
        </IconButton>
      )}

      {isFormVisible && (
        <MeetingForm
          meeting={initialMeeting}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditMode={isEditMode}
        />
      )}
    </Box>
  );
};

export default MeetingButton;
