import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useOTP=()=>{
  const navigate=useNavigate();
const [otp,setOTP]=useState("");
  const [isDisabled,setIsDisabled]=useState(true);
  const [isLocked,setisLocked]=useState(false);
  const [email,setEmail]=useState<string>("");
  const [error,setError]=useState<string>("");
  const [numberOfTries,setNumberOfTries]=useState(0);

  const fetchOTP = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_REQ_ADDRESS}/api/otp/${user_id}/`);
      setOTP(response.data.otp);
      setEmail(response.data.email);
      setIsDisabled(false);
    } catch (err) {
      setError("Something went wrong, please try again later");
    }
  }
  
  useEffect(() => {
    fetchOTP();
  }, []);
  

  const handleSubmit = async() =>{
    await axios.post(`${import.meta.env.VITE_BACKEND_REQ_ADDRESS}/api/otp/verify/`,{
      otp:otp,
      email:email
    }).then(()=>{
      localStorage.setItem("verification","true");
      navigate("/profile");
    }).catch((err)=>{
      if(err.response.status===401){
        setError("Invalid OTP, please try again");
      }
      else{
        setError("Something went wrong, please try again later");
      }
      setisLocked(true);
      setIsDisabled(true);
    })
    setNumberOfTries(numberOfTries+1);
    if(numberOfTries>=5){
      setError("You have exceeded the number of tries, please try again later");
      setisLocked(true);
      setIsDisabled(true);
      return;
    }

  }


  const resend = () =>{
    window.location.reload();
  }

  const handleTimerExpire = async() =>{
    setIsDisabled(false);
    setError("Your session has expired, please try again");
    setisLocked(true);
  }

  return {otp,setOTP,isDisabled,isLocked,error,handleSubmit,resend,handleTimerExpire}
}