import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "../../../utils/refresh-token";
import { useAppDispatch, useAppSelector } from "../../../contexts/auth/hooks";
import { clearTokens, setAccessToken } from "../../../contexts/auth/slice";

export const useForm = () => {
  const [username, setUsername] = useState<string>("Username");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("Email");
  const [Image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const navigate=useNavigate();
  const access_token=useAppSelector((state)=>state.auth.access_token);
  const refresh_token=useAppSelector((state)=>state.auth.refresh_token);
  const user_id=useAppSelector((state)=>state.auth.user_id);
  const verification_status=useAppSelector((state)=>state.auth.verification);
  const dispatch=useAppDispatch();
  if(!verification_status){
    navigate('/verification');
  }
  useEffect(() => {

    const getProfileInformation = async () => {
      await axios.get(`http://127.0.0.1:8000/api/profile/get-profile/${user_id}/`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setImage(response.data.image);
        console.log(response);
      }
      ).catch(async(error) => {
        if(error.response.status==401){
          if(refresh_token){
            const result=await getRefreshToken(refresh_token);
            const accessToken=result.data.access;
            if(accessToken){
              dispatch(setAccessToken(accessToken));
            }
          }
          else{
            dispatch(clearTokens());
            localStorage.clear();
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



  return { email, username,Image,setImage, setUsername, password, setPassword, isLoading, error };
}

export default useForm;