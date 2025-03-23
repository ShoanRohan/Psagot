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
    console.log(updateUser)
    const response = await api.put('/User/UpdateUser',updateUser);
    console.log(response)
    return response.data;
};

const getAllLecturersAndCoordinators = async ()=> {
    const response = await api.get('/User/GetAllLecturersAndCoordinators');
    return response.data;
};

const tableUsers = async () =>{
        const response = await api.get(`/User/GetUsersByPage?pageNumber=1&pageSize=10`);
        return response.data;
};

const getUserByPage = async (pageNumber, pageSize) => {
    const response = await api.get(`/User/GetUsersByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
};




export{getAllUsers, getUserById, addUser, updatedUser,getAllLecturersAndCoordinators,tableUsers,getUserByPage};



