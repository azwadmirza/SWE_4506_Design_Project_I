import axios from "axios";
import { useEffect, useState } from "react";

export const useForm = () => {
  const [username, setUsername] = useState<string>("Username");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("Email");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    if (!accessToken || !user_id) {
      window.location.href = "/login";
    }
    const getProfileInformation = async () => {
      await axios.get(`http://127.0.0.1:8000/api/profile/get-profile/${user_id}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        
      }
      ).catch((error) => {
        setError(error.message);
        
      })
    }
    getProfileInformation();
  }, [])

  useEffect(()=>{
    if(username !== "Username" && email !== "Email"){
      setIsLoading(false);
    }
    if(error){
      setIsLoading(false);
    }
  },[username, email,error])



  return { email, username, setUsername, password, setPassword, isLoading, error };
}

export default useForm;