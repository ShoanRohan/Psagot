import api from "./api";

// CRUD functions for Day
const getDayById = async (id) => {
    const response = await api.get(`/Day/GetDayById/${id}`);
    return response.data;
};

const getAllDays = async () => {
    const response = await api.get('/Day/GetAllDays');
    return response.data;
};

const addDay = async (dayDTO) => {
    const response = await api.post('/Day/AddDay', dayDTO);
    return response.data;
};

const updateDay = async (dayDTO) => {
    const response = await api.put('/Day/UpdateDay', dayDTO);
    return response.data;
};

export { getDayById, getAllDays, addDay, updateDay };