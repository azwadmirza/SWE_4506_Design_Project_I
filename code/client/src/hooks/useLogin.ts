import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

export const useLogin=(changeLoadingState:React.Dispatch<React.SetStateAction<boolean>>)=>{

  const [error,setError]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [remember,setRemember]=useState<boolean>(false);



  const login=async()=>{
    changeLoadingState(true);
    axios.post("http://127.0.0.1:8000/api/login/", {
      email: email,
      password: CryptoJS.SHA512(password).toString(),
    },{
      withCredentials: true
    }).then((res) => {
      localStorage.setItem("access_token",res.data.access);
      if(remember){
        localStorage.setItem("refresh_token",res.data.refresh);
      }
      localStorage.setItem("user_id",res.data.user_id);
      localStorage.setItem("verification",res.data.verification);
      window.location.href = "/profile";
      setError("");
    }).catch((err)=>{
      console.log(err);
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