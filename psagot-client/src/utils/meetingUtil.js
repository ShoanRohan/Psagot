import api from './api';

const getAllMeetings = async () => {
  const response = await api.get('/Meeting/GetAllMeetings');
  return response.data;
};

const getMeetingById = async (id) => {
  const response = await api.get(`/Meeting/GetMeetingById/${id}`);
  return response.data;
};

const addMeeting = async (addNewMeeting) => {
  console.log("נשלח לשרת:", addNewMeeting);

  const response = await api.post("/Meeting/AddMeeting", addNewMeeting);
  return response.data;
}

const updateMeeting = async (meetingData) => {
  const response = await api.put('/Meeting/UpdateMeeting', meetingData);
  return response.data;
};

const deleteMeeting = async (meetingId) => {
  await api.delete(`/Meeting/DeleteMeeting/${meetingId}`);
  return meetingId; // רק ה-ID
};


export { getAllMeetings, updateMeeting, addMeeting, getMeetingById, deleteMeeting };





