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
        window.location.href = "/verification";
      }
      changeLoadingState(false);
    })
  }

  return { error, username, setUsername, email, setEmail, password, changePassword, confirmPassword, changeConfirmPassword, errorPassword, errorConfirmPassword, signup };
}