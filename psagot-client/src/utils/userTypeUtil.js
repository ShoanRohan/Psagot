import api from "./api";

// CRUD functions
const getAllUserTypes = async () => {
    const response = await api.get('/UserType/GetAllUserTypes');
    return response.data;
};

const getUserTypeById = async (id) => {
    const response = await api.get(`/UserType/GetUserTypeById/${id}`);
    return response.data;
};

const addUserType = async (newUserType) => {
    const response = await api.post('/UserType/AddUserType', newUserType);
    return response.data;
};

const updateUserType = async (updateUserType) => {
    const response = await api.put(`/UserType/UpdateUserType/${updateUserType.id}`, updateUserType);
    return response.data;
};

const deleteUserType = async (id) => {
    const response = await api.delete(`/UserType/DeleteUserType/${id}`);
    return response.data;
};

export { getAllUserTypes, getUserTypeById, addUserType, updateUserType, deleteUserType};
