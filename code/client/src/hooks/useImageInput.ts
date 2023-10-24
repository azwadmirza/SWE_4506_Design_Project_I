import { useState } from "react";

export const useImageInput=(upload_image:()=>Promise<void>)=>{
    const [locked,setLocked]=useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit=async()=>{
    setShow(false);
    setLocked(true);
    await upload_image();
    setLocked(false);
  }

  return {locked,show, setShow,handleSubmit};
}