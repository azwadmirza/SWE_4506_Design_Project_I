import {  useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../../partials/loader";
import { mailUnreadOutline, personCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import ConfirmPasswordModal from "./confirm-password-modal";
interface IProfile{
  email:string,
  username:string,
  setUsername:React.Dispatch<React.SetStateAction<string>>,
  password:string,
  setPassword:React.Dispatch<React.SetStateAction<string>>,
  error:string|undefined
}
const ProfileForm = ({email,username,setUsername,password,setPassword,error}:IProfile) => {
  const [isDisabled,turnOnEdit]=useState<boolean>(true);
  
  const [passwordVisibility,setPasswordVisibility]=useState("password");
  const [show,setShow]=useState(false);

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }

  return (
      <div>
        <div className="profileInfo d-flex justify-content-between">
          <h4 className="InfoHeader mb-4">Personal Information</h4>
          <button
            className="btn btn-outline-dark btn-editProfile "
            onClick={()=>turnOnEdit(!isDisabled)}
          >
            Edit <span className="mobile-view"> Profile</span>
            <i className="bx bx-cog bx-sm"></i>
          </button>
        </div>
        <Form>
        <div className="error" style={{color:"red"}}>{error}</div>

          <div className="inputbox">
            <IonIcon icon={personCircleOutline}></IonIcon>
            <input
              type="text"
              disabled={isDisabled}
              value={username}
              id="username"
              onChange={(e)=>setUsername(e.target.value)}
              />
          </div>
        <div className="inputbox">
          <IonIcon icon={mailUnreadOutline}></IonIcon>
          <input type="email" disabled={true} value ={email} id="email" />
        </div>
        {!isDisabled &&(<a href={"profile/change-password/" + "1234"} style={{marginLeft:"75%"}}>Change Password</a>)} 
        {!isDisabled && (
          <Button className="btn btn-outline-dark btn-save">
            Save
          </Button>
        )}
      </Form>
      <ConfirmPasswordModal show={show} handleClose={()=>setShow(false)} handleSubmit={handleSubmit} error={error} passwordVisibility={{passwordVisibility,setPasswordVisibility}} password={{password:password,setPassword:setPassword}}/>
      </div>
    );
};
export default ProfileForm;
