import api from "./api"

const getAllUsers = async ()=> {
    const response = await api.get('/User/GetAllUsers');
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
    const response = await api.put('/User/UpdateUser',updateUser);
    return response.data;
};

const getAllLecturersAndCoordinators = async ()=> {
    const response = await api.get('/User/GetAllLecturersAndCoordinators');
    return response.data;
};
const tableUsers = async () =>{
        const response = await api.get(`/User/GetUsers`);
        return response.data;
};


export{getAllUsers, getUserById, addUser, updatedUser,getAllLecturersAndCoordinators};
export{getAllUsers, getUserById, addUser, updatedUser,tableUsers};


