import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAccessTokens, setRefreshToken } from "../contexts/auth/slice";
import { useAppDispatch } from "../contexts/auth/hooks";

export const useLogin=(changeLoadingState:React.Dispatch<React.SetStateAction<boolean>>)=>{

  const [error,setError]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [remember,setRemember]=useState<boolean>(false);
  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  const login=async()=>{
    changeLoadingState(true);
    await axios.post("http://127.0.0.1:8000/api/login/", {
      email: email,
      password: CryptoJS.SHA512(password).toString(),
    },{
      withCredentials: true
    }).then((res) => {
      dispatch(setAccessTokens({ access_token: res.data.access, verification: res.data.verification, user_id: res.data.user_id }));
      if(remember===true){
        dispatch(setRefreshToken(res.data.refresh));
      }
      
      if(res.data.verification===false){
        navigate("/verification");
      }
      else{
        navigate("/data");
      }
      setError("");
    }).catch((err)=>{
      if(err.response.status==401){
        setError("Invalid password or email");
      }
      else{
        setError("Server error");
      }
      changeLoadingState(false);
    })
  }

  return {error,email,setEmail,password,setPassword,remember,setRemember,login};
}