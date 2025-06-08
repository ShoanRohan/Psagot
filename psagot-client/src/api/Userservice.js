import axios from "axios";

let BaseUrl='https://localhost:44333/api';
export function GetallUsers(token) {
    return axios.get(BaseUrl,{
        headers:{
        "Authorization":'Bearer{token}'
        }
    })
}


