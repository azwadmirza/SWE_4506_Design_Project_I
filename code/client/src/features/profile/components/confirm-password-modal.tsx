import { IonIcon } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import { Modal } from "react-bootstrap";

interface ConfirmPasswordProps{
  show:boolean;
  handleClose:()=>void;
  handleSubmit:(e: React.FormEvent<HTMLFormElement>) => void;
  passwordVisibility:{
    passwordVisibility:string;
    setPasswordVisibility:React.Dispatch<React.SetStateAction<string>>;
  };
  password:{
    password:string;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
  };
  error:string|undefined;
}

const ConfirmPasswordModal = ({show,handleClose,handleSubmit,passwordVisibility,password,error}:ConfirmPasswordProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
                  <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter password to confirm changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="errorMessageShow" style={{color:"red"}}>{error}</div>
            
                  <div className="inputbox">
              {(passwordVisibility.passwordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => passwordVisibility.setPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (passwordVisibility.passwordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => passwordVisibility.setPasswordVisibility("password")}
                ></IonIcon>
              ))}
                  <input
                    type={passwordVisibility.passwordVisibility}
                    onChange={(e) => password.setPassword(e.target.value)}
                    value={password.password}
                  />
                <label htmlFor="">Confirm New Password</label>
              </div>
                 
                </Modal.Body>
                <Modal.Footer>
                  <button className="custom-button" onClick={handleClose}>
                    Close
                  </button>
                  <button type="submit" className="custom-button">
                    Save Changes
                  </button>
                </Modal.Footer>
                  </form>
              </Modal>
    );
}
 
export default ConfirmPasswordModal;