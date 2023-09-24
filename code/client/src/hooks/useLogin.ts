import { useState } from "react";
import CryptoJS from "crypto-js";

export const useLogin=()=>{

  const [error,setError]=useState<string>();
  const [email,setEmail]=useState<string>();
  const [password,setPassword]=useState<string>();
  const [submitPassword,setSubmitPassword]=useState<string>();

  const changePassword=(input:string)=>{
    setPassword(input);
    setSubmitPassword(CryptoJS.SHA512(input).toString());
  }

  const login=async()=>{

  }

  return {error,email,setEmail,password,changePassword,login};
}