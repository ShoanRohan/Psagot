import api from "./api";

const getAllUser = async () => {
    const response= await api.get('user/GetAllUser');
    return response.data;
};

const getUserById =async (id) => {
    const response = await api.get(`/User/GetUserById/${id}`);
    return response.data;
};

const addUser = async (newUser) => {
    const response = await api.post('/User/AddUser', newUser);
    return response.data;
};

const updateUser = async (updateUser) => {
    const response = await api.put(`/User/UpdateUser/${updateUser.id}`, updateUser);
    return response.data;
};

const deleteUser =async (id) => {
    const response = await api.delete(`/User/DeleteUser/${id}`);
    return response.data;
};

export {getAllUser, getUserById, addUser, updateUser, deleteUser};