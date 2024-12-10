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
    return response.data;
};

const getRoomById = async (id) => {
    const response = await api.get(`/Room/GetRoomById/${id}`);
    return response.data;
};

export { addRoom, updateRoom,getAllRooms, getRoomById };
