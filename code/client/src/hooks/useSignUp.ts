import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
export const useSignUp=()=>{
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername]=useState<string>();
  const [error,setError]=useState<string>();
  const [errorPassword,setErrorPassword]=useState<string>();
  const [errorConfirmPassword,setErrorConfirmPassword]=useState<string>();
  const [email,setEmail]=useState<string>();
  const [password,setPassword]=useState<string>();
  const [confirmPassword,setConfirmPassword]=useState<string>();
  const [submitPassword,setSubmitPassword]=useState<string>();
  const [dsiable,setDisable]=useState<boolean>(true);

  const changePassword=(input:string)=>{
    if(input!==confirmPassword){
      setErrorPassword("Password not match");
      setDisable(true);
    }
    else{
      setErrorPassword("");
    }
    setPassword(input);
    setSubmitPassword(CryptoJS.SHA512(input).toString());
  }

  const changeConfirmPassword=(input:string)=>{
    if(input!==password){
      setErrorConfirmPassword("Password not match");
      setDisable(true);
    }
    else{
      setErrorConfirmPassword("");
    }
    setConfirmPassword(input);
  }

  const signup=async()=>{
      axios.post("/api/signup",{
        username:username,
        email:email,
        password:submitPassword,
      }).then((res)=>{
        if(res.data.error){
          setError(res.data.error);
        }else{
          window.location.href="/login";
        }
      })
  }

  return {loading,error,username,setUsername,email,setEmail,password,changePassword,confirmPassword,changeConfirmPassword,errorPassword,errorConfirmPassword,dsiable,signup};
}