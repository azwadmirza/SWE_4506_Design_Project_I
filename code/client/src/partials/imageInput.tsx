import Loader from "./loader";
import '../assets/css/profile-picture.css';
import UploadImage from "./uploadImage";
import { useImageUpload } from "../hooks/useImageUpload";
import { useState } from "react";

type ImageInputProps={
  imageURL:string,
  setImage:React.Dispatch<React.SetStateAction<string>>
}

const ImageInput=({imageURL,setImage}:ImageInputProps)=>{
  const [locked,setLocked]=useState(false);
  const [show, setShow] = useState(false);
  const [image,setImageFile]=useState<File|undefined>(undefined);
  const {upload_image}=useImageUpload(image,setImage);

  const handleSubmit=async()=>{
    setShow(false);
    setLocked(true);
    await upload_image();
    setLocked(false);
  }
  if(locked===false){
    return (
      <div className="profile-picture-container">
        <img src={imageURL} alt="profile-picture"/>
        <p className="edit-profile-picture" onClick={() => setShow(true)}>Edit</p>
        <UploadImage modal={{show,setShow}} setImage={setImageFile} handleSubmit={handleSubmit} />
      </div>
    );
  }
  else{
    return (
      <Loader/>
    );
  }
}

export default ImageInput;