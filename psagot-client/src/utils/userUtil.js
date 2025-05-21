import api from "./api"

const getAllUsers = async ()=> {
    const response = await api.get('/User/GetAllUsers');
    return response.data;
};

const getAllCoordinators = async ()=> {
    const response = await api.get('/User/GetAllCoordinators');
    return response.data;
};

const getUserById = async (id) => {
    const response = await api.get(`/User/GetUserById/${id}`);
    return response.data;
};

const addUser = async (newUser) => {
    const response = await api.post('/User/AddUser', newUser);
    return response.data;
};

const updatedUser = async (updateUser) => {
    console.log(updateUser)
    const response = await api.put('/User/UpdateUser',updateUser);
    console.log(response)
    return response.data;
};

const getAllLecturersAndCoordinators = async ()=> {
    const response = await api.get('/User/GetAllLecturersAndCoordinators');
    return response.data;
};

const getCoordinators = async () => {
    const response = await api.get('/User/GetCoordinators');
    return response.data;
};

const getUsersByPage = async (pageNumber, pageSize) => {
    const response = await api.get(`/User/GetUsersByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
};

export { getAllUsers, getAllCoordinators, getUserById, addUser, updatedUser, getAllLecturersAndCoordinators, getCoordinators, getUsersByPage };



