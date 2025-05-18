import api from "./api"

const getAllMeetings = async() => {
    const response = await api.get('/Meeting/GetAllMeetings');
    return response.data;
};

const updateMeeting = async (updateMeeting) => {
    const response = await api.put("/Meeting/UpdateMeeting", updateMeeting);
    return response.data;
};

const addMeeting = async (addNewMeeting) => {
    const response = await api.post("/Meeting/AddMeeting", addNewMeeting);
    return response.data;
};

const getMeetingeById = async (id) => {
    const response = await api.get(`/Meeting/GetMeetingById/${id}`);
    return response.data;
};

const deleteMeetingById = async (meetingId) => {
    const response = await api.delete(`/Meeting/DeleteMeeting/${meetingId}`);
    return response.data;
};

// // בקובץ meetingUtil.js בצד הקליינט
// const deleteMeetingById = async (meetingId) => {
//     try {
//       const response = await fetch(`/api/meetings/${meetingId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'שגיאה במחיקת המפגש');
//         } else {
//           throw new Error(`שגיאה במחיקת המפגש: ${response.status} ${response.statusText}`);
//         }
//       }
  
//       return meetingId;
//     } catch (error) {
//       console.error('Error deleting meeting:', error);
//       throw error;
//     }
//   };
  

export { getAllMeetings, updateMeeting, addMeeting, getMeetingeById,deleteMeetingById };