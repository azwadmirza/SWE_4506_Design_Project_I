import Card from "react-bootstrap/Card";
import { useState } from "react";
import '../assets/css/change-password.css';
import { useNavigate, useParams } from "react-router-dom";
import NavbarUser from "../../../partials/navbarUser";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";

const ChangePassword = () => {
  const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(
    "password"
  );
  const [NewPasswordVisibility, setNewPasswordVisibility] = useState("password");
  const [
    confirmNewPasswordVisibility,
    setConfirmNewPasswordVisibility,
  ] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  };

  const changeCurrentPassword = (e: string) => {
    setCurrentPassword(e);
  };

  const passwordChange = (e: string) => {
    setNewPassword(e);
  };

  const confirmPasswordChange = (e: string) => {
    setConfirmPassword(e);
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
                    value={currentPassword}
                    onChange={(e) => changeCurrentPassword(e.target.value)}
                  />
                  <label htmlFor="">Current Password</label>
              </div>
              <div className="inputbox">
              {(NewPasswordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setNewPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (NewPasswordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setNewPasswordVisibility("password")}
                ></IonIcon>
              ))}
                  <input
                    type={NewPasswordVisibility}
                    onChange={(e) => passwordChange(e.target.value)}
                    value={newPassword}
                  />
                  <label htmlFor="">New Password</label>
              </div>
              <div className="inputbox">
              {(confirmNewPasswordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setConfirmNewPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (confirmNewPasswordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setConfirmNewPasswordVisibility("password")}
                ></IonIcon>
              ))}
                  <input
                    type={confirmNewPasswordVisibility}
                    onChange={(e) => confirmPasswordChange(e.target.value)}
                    value={confirmPassword}
                  />
                <label htmlFor="">Confirm New Password</label>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  disabled={disableButton}
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
