import React from 'react';
import MeetingForm from '../components/MeetingForm';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useDispatch} from 'react-redux';
import { addMeetingAction, updateMeetingAction } from '../features/meeting/meetingActions';

const MeetingPage = () => {
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  const handleSave = async (meetingData) => {
      // אם יש id – שלח עדכון, אחרת הוספה
       if  (meetingData.id)
            dispatch (updateMeetingAction(meetingData))
          else
            dispatch (addMeetingAction(meetingData))
      // ניווט חזרה או הודעה למשתמש
      navigate('/meetings'); // מסך המפגשים
   };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        הוספת/עריכת מפגש
      </Typography>
      <MeetingForm onSave={handleSave} />
    </Container>
  );
};

export default MeetingPage;
