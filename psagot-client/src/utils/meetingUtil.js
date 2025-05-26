import api from './api';

export const getAllMeetings = async () => {
  const response = await api.get('/Meeting/GetAllMeetings');
  return response.data;
};

export const getMeetingById = async (id) => {
  const response = await api.get(`/Meeting/GetMeetingById/${id}`);
  return response.data;
};

export const addMeeting = async (meetingData) => {
  const response = await api.post('/Meeting/AddMeeting', meetingData);
  return response.data;
};

export const updateMeeting = async (meetingData) => {
  const response = await api.put('/Meeting/UpdateMeeting', meetingData);
  return response.data;
};

export const deleteMeeting = async (meetingId) => {
  // מוחק את המפגש
  await api.delete(`/Meeting/DeleteMeeting/${meetingId}`);
  
  // מביא את כל המפגשים המעודכנים (ללא המפגש שנמחק)
  const response = await api.get('/Meeting/GetAllMeetings');
  return response.data;
};

// אם יש פונקציה ישנה עם שגיאת כתיב, הסר אותה:
// export const getMeetingeById = ... // מחק את השורה הזאת אם היא קיימת
