import NavbarLanding from "../partials/landing/navbarLanding";
import { Image } from "react-bootstrap";

const Error400 = () => {
  return ( 
    <div className="error">
      <NavbarLanding/>
      <div className="innerContent">
        <h1 style={{marginTop:'5%',marginLeft:'5%'}}>Error 400</h1>
        <p style={{marginLeft:'5%'}}>You have come across a bad request</p>
        <Image src="/LandingImage.jpg" alt="URL is invalid" style={{marginLeft:'5%',width:"40%",height:"50vh"}}></Image>
      </div>
    </div>
   );
}
 
export default Error400;