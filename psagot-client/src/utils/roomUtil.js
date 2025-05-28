import api from "./api";

// CRUD functions
const addRoom = async (room) => {
    const response = await api.post('/Room', room);
    return response.data;
};

const updateRoom = async (room) => {
    const response = await api.put('/Room', room);
    return response.data;
};

const getAllRooms = async () => {
    const response = await api.get('/Room/GetAllRooms');   
     console.log(response.data)
    return response.data;
};

const getRoomById = async (id) => {
    const response = await api.get(`/Room/GetRoomById/${id}`);
    return response.data;
};

const getRoomsScheduleByDate = async (dateTime) => {
    const response = await api.get(`/Room/GetCourseScheduleByDate`, {
      params: { date: dateTime }
    });
    return response.data;
};

const getAllRoomsBySearchWithPagination = async (searchRoom, pageNumber, pageSize, searchStatus) => {
    let params = new URLSearchParams();

    Object.entries(searchRoom).forEach(([key, value]) => {
        params.append(key, value);
    });

    params.append("pageNumber", pageNumber);
    params.append("pageSize", pageSize);
    params.append("searchStatus", searchStatus);

    const response = await api.get(`/Room/GetAllRoomsBySearchWithPagination`, { params });
    return response.data;
};

export { addRoom, updateRoom,getAllRooms, getRoomById,getRoomsScheduleByDate,getAllRoomsBySearchWithPagination };