import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../contexts/auth/hooks";
import DOMPurify from "dompurify";


export const useImageUpload=(image:File|undefined,setImageURL:React.Dispatch<React.SetStateAction<string>>)=>{
  const [errorImage,setErrorImage]=useState("");
  const uid=useAppSelector((state)=>state.auth.user_id);
  const access_token=useAppSelector((state)=>state.auth.access_token);

  const upload_image=async()=>{
    if(image){
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "datanalytica");
      await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      ).then(async(res)=>{
        setErrorImage("");
        setImageURL(res.data.secure_url);
        await axios.put(`http://127.0.0.1:8000/api/profile/update-profile/${uid}/`,{image: res.data.secure_url},{
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).catch((error)=>{
        console.log(error);
      })
        return res.data;
      })
      .catch((error)=>{
        setErrorImage(error.response.data.message);
        console.log(error);
      })
      
    }
    else{
      setErrorImage("Image has not been added");
    }
  }

  return {errorImage,upload_image};
}