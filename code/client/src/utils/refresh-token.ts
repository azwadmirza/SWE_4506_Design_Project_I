import axios from "axios"

export const getRefreshToken=async(refresh_token:string)=>{
    const result=await axios.post(`${import.meta.env.VITE_BACKEND_REQ_ADDRESS}/api/refresh-token/`,{
        refresh:refresh_token
    },{
        headers:{
            'Content-Type': 'application/json'
        }
    });
    return result;
}