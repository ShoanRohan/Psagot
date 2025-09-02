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
const getRoomsScheduleByDate = async (dateTime) =>{
    const response = await api.get(`/Room/GetRoomsScheduleByDate`,dateTime);
    return response.data;
}
const getAllRoomsBySearchWithPagination = async (params) => {
    console.log(params);
     const { roomName, mic, projector, computer, numOfSeats, pageNumber, pageSize, searchStatus } = params;
      const response = await api.get(`/Room/getAllRoomsBySearchWithPagination?roomName=${roomName || ''}&mic=${mic}&projector=${projector}&computer=${computer}&numOfSeats=${numOfSeats}&pageNumber=${pageNumber}&pageSize=${pageSize}&searchStatus=${searchStatus}`);
       return response.data; };



export { addRoom, updateRoom,getAllRooms, getRoomById,getRoomsScheduleByDate,getAllRoomsBySearchWithPagination };