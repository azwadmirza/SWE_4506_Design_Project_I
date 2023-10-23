import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "../../../utils/refresh-token";

export const useForm = () => {
  const [username, setUsername] = useState<string>("Username");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("Email");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const navigate=useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    const getProfileInformation = async () => {
      await axios.get(`http://127.0.0.1:8000/api/profile/get-profile/${user_id}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      }
      ).catch(async(error) => {
        if(error.response.status==401){
          const refreshToken=localStorage.getItem('refresh_token');
          if(refreshToken){
            const accessToken=await getRefreshToken(refreshToken);
            localStorage.setItem('access_token',accessToken.data.access);
            window.location.reload();
          }
          else{
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('verification');
            localStorage.removeItem('user_id');
            navigate('/');
          }
          
        }
        else{
          setError(error.data.message);
        }
      })
    }
    getProfileInformation();
  }, [])

  useEffect(()=>{
    if(username !== "Username" && email !== "Email"){
      setIsLoading(false);
    }
    if(error){
      setIsLoading(false);
    }
  },[username, email,error])



  return { email, username, setUsername, password, setPassword, isLoading, error };
}

export default useForm;