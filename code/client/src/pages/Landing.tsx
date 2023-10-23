import NavbarLanding from "../partials/navbarLanding";
import '../assets/css/landing.css';
import { arrowForwardCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ILanding{
  access_token:string|null,
  refresh_token:string|null,
  verification:boolean|null
}

const Landing = ({access_token,refresh_token,verification}:ILanding) => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(access_token){
      if(verification){
        navigate('/profile');
      }
      else{
        navigate('/verification')
      }
    }
  },[])
  
  return ( 
  <div className="landing">
    <NavbarLanding/>
    <div className="landing-container">
        <div className="landing-card">
          <div className="landing-content">
            <span className="heading">Exploratory Data Analysis & ML System</span>
            <h1>DataAnalytica.io</h1>
            <p>
            Our system streamlines data analysis and machine learning with a no-code approach. We process your data, offer tailored visualizations, build customized machine learning models, and empower users to bridge the gap between data and real-world applications. Join us to unlock the power of data effortlessly.
            </p>
          </div>
          <div className="get-started">
            <button
              className="custom-button"
              onClick={() => navigate("/signin")}
            >
              <span>Get Started</span>
              <IonIcon
                icon={arrowForwardCircleOutline}
                className="get-started-icon"
              ></IonIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="landing-image">
        <img src="/landing-background.png" width="100%" alt="landing-background" />
      </div>
  </div>
   );
}
 
export default Landing;