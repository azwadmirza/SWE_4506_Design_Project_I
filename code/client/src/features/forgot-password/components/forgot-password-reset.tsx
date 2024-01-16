import {
  Form
} from "react-bootstrap";
import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


type PasswordResetProps={
  email:string
};

const PasswordReset = ({email}:PasswordResetProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<string>(
    "password"
  );
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<
    string
  >("password");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const navigate=useNavigate();
  const [isDisabled, setIsDisabled] =useState(false);
  const changePassword = (input: string) => {
    if(input.length < 8){
      setErrorPassword("Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol and 1 number");
    }
    else{
      setErrorPassword("");
    }
    var numberpresent = false;
    var symbolpresent = false;
    var uppercaseletterpresent = false;
    var lowercaseletterpresent = false;
    for(var i = 0; i < input.length; i++){
      if(input[i] >= '0' && input[i] <= '9'){
        numberpresent = true;
      }
      else if(input[i] >= 'a' && input[i] <= 'z'){
        lowercaseletterpresent = true;
      }
      else if(input[i] >= 'A' && input[i] <= 'Z'){
        uppercaseletterpresent = true;
      }
      else{
        symbolpresent = true;
      }
    }
    if(!(numberpresent && symbolpresent && uppercaseletterpresent && lowercaseletterpresent)){
      setErrorPassword("Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol and 1 number");
    }
    else{
      setErrorPassword("");
    }
    if (input !== confirmPassword) {
      setErrorConfirmPassword("Password not match");
    }
    else {
      setErrorPassword("");

    }
    setPassword(input);
  }

  const changeConfirmPassword = (input: string) => {
    if (input !== password) {
      setErrorConfirmPassword("Password not match");
    }
    else {
      setErrorConfirmPassword("");

    }
    setConfirmPassword(input);
  }



  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsDisabled(true);
    await axios.post(`${import.meta.env.VITE_BACKEND_REQ_ADDRESS}/api/forgot/update/`, {
      email: email,
      password: CryptoJS.SHA512(password).toString()
    }).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data.message);
    })
  }

  return ( 
        <Form onSubmit={(e)=>handleSubmit(e)}> 
                  <div id="errorPassword" className="errorBox">
                    {errorMessage}
            {errorPassword}
          </div>
          <div className="inputbox">
            {(passwordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (passwordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setPasswordVisibility("password")}
                ></IonIcon>
              ))}
            <input
              type={passwordVisibility}
              onChange={(e) =>
                changePassword(DOMPurify.sanitize(e.target.value))
              }
              id="password"
              name="password"
              required
              value={password}
            />
            <label htmlFor="">Password</label>
          </div>
          <div id="errorConfirmPassword" className="errorBox">
            {errorConfirmPassword}
          </div>
          <div className="inputbox">
            {(confirmPasswordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setConfirmPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (confirmPasswordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setConfirmPasswordVisibility("password")}
                ></IonIcon>
              ))}
            <input
              type={confirmPasswordVisibility}
              onChange={(e) =>
                changeConfirmPassword(DOMPurify.sanitize(e.target.value))
              }
              required
              value={confirmPassword}
              id="confirmPassword"
              name="confirmPassword"
            />
            <label htmlFor="">Re-enter password</label>
          </div>

                  <div className='d-flex justify-content-center'>
        <button  className='d-flex w-100  mx-auto custom-button full-width'  type="submit" disabled={isDisabled}>
          Reset Password
        </button>
        </div>
      </Form>  
   );
}
 
export default PasswordReset;