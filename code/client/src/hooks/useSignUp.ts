import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

export const useSignUp = (changeLoadingState:React.Dispatch<React.SetStateAction<boolean>>) => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const changePassword = (input: string) => {
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

  const signup = async () => {
    changeLoadingState(true);
    axios.post("http://127.0.0.1:8000/api/register/", {
      username: username,
      email: email,
      password: CryptoJS.SHA512(password).toString(),
    },{
      withCredentials: true
    }).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
      } else {
        window.location.href = "/login";
      }
      changeLoadingState(false);
    })
  }

  return { error, username, setUsername, email, setEmail, password, changePassword, confirmPassword, changeConfirmPassword, errorPassword, errorConfirmPassword, signup };
}