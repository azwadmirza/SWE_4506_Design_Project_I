import axios from "axios";
import { useEffect, useState } from "react";

export const useOTP=()=>{
const [otp,setOTP]=useState("");
  const [isDisabled,setIsDisabled]=useState(true);
  const [isLocked,setisLocked]=useState(false);
  const [error,setError]=useState<string>("");
  const [numberOfTries,setNumberOfTries]=useState(0);

   useEffect(()=>{
    const fetchOTP=async()=>{
        const user_id=localStorage.getItem("user_id");
        await axios.get(`http://127.0.0.1:8000/api/otp/${user_id}/`).then((res)=>{
            setOTP(res.data.otp);
            console.log(res);
            setIsDisabled(false);
        }).catch((err)=>{
            console.log(err);
        })
    }
    fetchOTP();
   },[])

  const handleSubmit = async() =>{
    setNumberOfTries(numberOfTries+1);
    if(numberOfTries>=5){
    setError("You have exceeded the number of tries, please try again later");
      setisLocked(true);
      return;
    }
  }


  const resend = () =>{
    window.location.reload();
  }

  const handleTimerExpire = async() =>{

  }

  return {otp,setOTP,isDisabled,isLocked,error,handleSubmit,resend,handleTimerExpire}
}