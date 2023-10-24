import Loader from "./loader";
import '../assets/css/profile-picture.css';
import { useImageInput } from "../hooks/useImageInput";
import UploadImage from "./uploadImage";

type ImageInputProps={
  imageURL:string|undefined,
  setImage:React.Dispatch<React.SetStateAction<File | undefined>>,
  upload_image:()=>Promise<void>
}

const ImageInput=({imageURL,setImage,upload_image}:ImageInputProps)=>{
  const {locked,show, setShow,handleSubmit}=useImageInput(upload_image);

  if(locked===false){
    return (
      <div className="profile-picture-container">
        <img src={imageURL} alt="profile-picture"/>
        <p className="edit-profile-picture" onClick={() => setShow(true)}>Edit</p>
        <UploadImage modal={{show,setShow}} setImage={setImage} handleSubmit={handleSubmit} />
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