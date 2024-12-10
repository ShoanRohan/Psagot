import api from "./api";


const getAllRooms = async () => {
    const response = await api.get('/Room/GetAllRooms');
    return response.data;
};

const getRoomById = async (id) => {
    const response = await api.get(`/Room/GetRoomById/${id}`);
    return response.data;
};

const addRoom = async (newRoom) => {
    const response = await api.post('/Room/AddRoom', newRoom);
    return response.data;
};

const updateRoom = async (updateRoom) => {
    const response = await api.put(`/Room/UpdateRoom/${updateRoom.id}`, updateRoom);
    return response.data;
};

const deleteRoom = async (id) => {
    const response = await api.delete(`/Room/DeleteRoom/${id}`);
    return response.data;
};

export { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom };
