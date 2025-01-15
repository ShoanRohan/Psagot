import api from "./api";

const updateMeeting = async (updateMeeting) => {
  const response = await api.put("/Meeting/UpdateMeeting", updateMeeting);
  return response.data;
};

export { updateMeeting };
