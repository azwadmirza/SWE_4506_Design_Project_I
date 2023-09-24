import { useState } from "react";
import axios from "axios";


export const useImageUpload=(defaultImageURL:string|undefined)=>{
  const [imageURL,setImageURL]=useState(defaultImageURL);
  const [image,setImage]=useState<File>();
  const [errorImage,setErrorImage]=useState("");

  const upload_image=async()=>{
    if(image){
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "med_guard");
      await axios.post(
        "https://api.cloudinary.com/v1_1/dzerdaaku/image/upload",
        formData
      ).then((res)=>{
        console.log(res);
        setErrorImage("");
        setImageURL(res.data.url);
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

  return {imageURL,setImage,errorImage,upload_image};
}