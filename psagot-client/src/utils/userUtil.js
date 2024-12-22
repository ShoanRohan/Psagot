import api from "./api";

// CRUD functions

const addUser = async (userDTO) => {
    const response = await api.post('/User/AddUser', userDTO);
    return response.data;
};

const updateUser = async (userDTO) => {
    const response = await api.put('/User/UpdateUser', userDTO);
    return response.data;
};

export {addUser,updateUser };