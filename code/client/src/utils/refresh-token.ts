import axios from "axios"

export const getRefreshToken=async(refresh_token:string)=>{
    const result=await axios.post('http://127.0.0.1:8000/api/refresh-token/',{
        refresh:refresh_token
    },{
        headers:{
            'Content-Type': 'application/json'
        }
    });
    return result;
}