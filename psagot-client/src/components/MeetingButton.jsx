import React, { useState, useEffect } from 'react';
import { Button, IconButton, Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MeetingForm from './MeetingForm';
import {useDispatch, useSelector } from 'react-redux';
import { clearError, resetStatus } from '../features/meeting/meetingSlice';
import { useNavigate } from 'react-router-dom';

const MeetingButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [initialMeeting, setInitialMeeting] = useState(null);
  const { isLoading, error } = useSelector((state) => state.meeting);

  
  const dispatch = useDispatch();
 

  const exampleMeeting = {
    meetingId: 0,
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
  const navigate = useNavigate();





  const handleAddMeeting = () => {
    dispatch(clearError());
    dispatch(resetStatus());
    setIsEditMode(false);
    navigate('/add-meeting')
  };


  const handleCancel = () => {
    setIsFormVisible(false);
    dispatch(clearError());
    dispatch(resetStatus());
  };

 const handleSave = async (addedMeeting) => { // זה יהיה addedMeeting מהשרת
    try {
        console.log("Meeting saved successfully:", addedMeeting);
        alert('המפגש נשמר בהצלחה!');
        setIsFormVisible(false);
    } catch (error) {
        console.error('שגיאה בשמירת מפגש (מתוך MeetingButton):', error);
        alert('שגיאה בשמירת המפגש: אנא בדוק את הפרטים ונסה שוב.');
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
      >
        הוספת מפגש
      </Button>

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