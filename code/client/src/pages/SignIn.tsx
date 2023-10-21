import { useEffect, useState } from "react";
import Login from "../components/login";
import SignUp from "../components/signup";
import NavbarLanding from "../partials/navbarLanding";
import '../assets/css/signin.css';
import Loader from "../partials/loader";

interface SignInProps {
    location: string; 
  }

const SignIn = ({location}:SignInProps) => {
  const [loading,setLoading]=useState<boolean>(false);
 if(!loading){
  return ( 
    <div className="signin">
      <NavbarLanding/>
      {location==="login" && (<Login changeLoadingState={setLoading}/>)}
      {location==="signup" && (<SignUp changeLoadingState={setLoading}/>)}
    </div>
     );
 }
 else{
    return (
      <div>
        <Loader/>
      </div>
    )
 }
}
 
export default SignIn;