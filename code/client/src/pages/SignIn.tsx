import { useState } from "react";
import Login from "../components/login";
import SignUp from "../components/signup";
import NavbarLanding from "../partials/navbarLanding";
import '../assets/css/signin.css';

const SignIn = () => {
  const[location,setLocation]=useState<string>("Login");
  return ( 
  <div className="signin">
    <NavbarLanding/>
    {location==="Login" && (<Login changeState={setLocation}/>)}
    {location==="SignUp" && (<SignUp changeState={setLocation}/>)}
  </div>
   );
}
 
export default SignIn;