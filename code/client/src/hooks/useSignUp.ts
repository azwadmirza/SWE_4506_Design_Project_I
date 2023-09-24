import { useState } from "react";
import CryptoJS from "crypto-js";
export const useSignUp=()=>{
  const [userType,setUserType]=useState<string>("customer");
  const [username, setUsername]=useState<string>();
  const [error,setError]=useState<string>();
  const [errorPassword,setErrorPassword]=useState<string>();
  const [errorConfirmPassword,setErrorConfirmPassword]=useState<string>();
  const [email,setEmail]=useState<string>();
  const [password,setPassword]=useState<string>();
  const [confirmPassword,setConfirmPassword]=useState<string>();
  const [submitPassword,setSubmitPassword]=useState<string>();
  
  const changePassword=(input:string)=>{
    setPassword(input);
    setSubmitPassword(CryptoJS.SHA512(input).toString());
  }

  const changeConfirmPassword=(input:string)=>{
    setConfirmPassword(input);
  }

  const signup=async()=>{

  }

  return {error,userType,setUserType,username,setUsername,email,setEmail,password,changePassword,confirmPassword,changeConfirmPassword,errorPassword,errorConfirmPassword,signup};
}