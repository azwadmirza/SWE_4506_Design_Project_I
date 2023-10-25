import Card from "react-bootstrap/Card";
import { useState } from "react";
import '../assets/css/change-password.css';
import { useNavigate, useParams } from "react-router-dom";
import NavbarUser from "../../../partials/navbarUser";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import axios from "axios";
import { useAppSelector } from "../../../contexts/auth/hooks";
import CryptoJS from "crypto-js";

const ChangePassword = () => {
  const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(
    "password"
  );
  const [password, setPassword] = useState("");
  const [current_password, setCurrentPassword] = useState("");
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

  const userId=useAppSelector((state) => state.auth.user_id);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    if (password !== confirmPassword) {
      setErrorPassword("New passwords do not match");
      setErrorConfirmPassword("New passwords do not match");
      return;
    } else {
      setErrorPassword("");
      setErrorConfirmPassword("");
    }
    await axios.post("http://127.0.0.1:8000/api/change/", {
        current_password: CryptoJS.SHA512(current_password).toString(),
        new_password: CryptoJS.SHA512(password).toString(),
        id: userId, 
      })
      .then(()=>{
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setErrorCurrentPassword("Current password is incorrect");
        } else if (error.response.status === 404) {
          setErrorCurrentPassword("User not found");
        } else {
          setErrorCurrentPassword("Something went wrong");
        }
      });

  };

  const changeCurrentPassword = (e: string) => {
    setCurrentPassword(e);
  };


  return (
    <div className="change-password-bg">
      <section className="d-flex justify-content-center">
        <NavbarUser />
        <Card>
          <div className="change-password">
          <Card.Header
            className=""
          >
            <h2>Change Password</h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <div className="inputbox">
              {(currentPasswordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setCurrentPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (currentPasswordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setCurrentPasswordVisibility("password")}
                ></IonIcon>
              ))}
                  <input
                    type={currentPasswordVisibility}
                    value={current_password}
                    onChange={(e) => changeCurrentPassword(e.target.value)}
                  />
                  <label htmlFor="">Current Password</label>
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
                    onChange={(e) => changePassword(e.target.value)}
                    value={password}
                  />
                  <label htmlFor="">New Password</label>
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
                    onChange={(e) => changeConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                <label htmlFor="">Confirm New Password</label>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="custom-button"
                >
                  Confirm
                </button>
              </div>
            </form>
          </Card.Body>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ChangePassword;
