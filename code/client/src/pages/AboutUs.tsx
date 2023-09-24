import NavbarLanding from "../partials/navbarLanding";
import '../assets/css/about-us.css';
import { Card } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { logoGithub, logoLinkedin } from "ionicons/icons";

const AboutUs = () => {
  return (
  <div className="about-us">
    <NavbarLanding/>
    <div className="cards d-flex">
    <Card>
      <Card.Header className="header-pro">Developer Information</Card.Header>
      <Card.Body>
        <div className="information">
          This project is developed for Software Design Project Course SWE 4506 using the following technologies:
          <div>
          </div>
          
        </div>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header className="header">Mirza Mohammad Azwad</Card.Header>
      <Card.Body>
        <div>
        <span className="title">Institute:</span> Islamic University of Technology(IUT), Board Bazar, Gazipur, Dhaka, Bangladesh
        </div>
        <div>
          <span className="title">Academic Status:</span> 5th Semester, 3rd Year
        </div>
        <div className="connect">
          <IonIcon icon={logoGithub} className="icons" onClick={()=>window.location.href="https://github.com/mirzaazwad"}></IonIcon>
          <IonIcon icon={logoLinkedin} className="icons" onClick={()=>window.location.href="https://bd.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4"}></IonIcon>
        </div>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header className="header">Nazmul Hossain</Card.Header>
      <Card.Body>
        <div>
        <span className="title">Institute:</span> Islamic University of Technology(IUT), Board Bazar, Gazipur, Dhaka, Bangladesh
        </div>
        <div>
          <span className="title">Academic Status:</span> 5th Semester, 3rd Year
        </div>
        <div className="connect">
          <IonIcon icon={logoGithub} className="icons" onClick={()=>window.location.href="https://github.com/mirzaazwad"}></IonIcon>
          <IonIcon icon={logoLinkedin} className="icons" onClick={()=>window.location.href="https://bd.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4"}></IonIcon>
        </div>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header className="header">Rhidwan Rashid</Card.Header>
      <Card.Body>
        <div>
        <span className="title">Institute:</span> Islamic University of Technology(IUT), Board Bazar, Gazipur, Dhaka, Bangladesh
        </div>
        <div>
          <span className="title">Academic Status:</span> 5th Semester, 3rd Year
        </div>
        <div className="connect">
          <IonIcon icon={logoGithub} className="icons" onClick={()=>window.location.href="https://github.com/mirzaazwad"}></IonIcon>
          <IonIcon icon={logoLinkedin} className="icons" onClick={()=>window.location.href="https://bd.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4"}></IonIcon>
        </div>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header className="header">Md. Nazmul Haque(Institutional Supervisor)</Card.Header>
      <Card.Body>
        <div>
        <span className="title">Institute:</span> Islamic University of Technology(IUT), Board Bazar, Gazipur, Dhaka, Bangladesh
        </div>
        <div>
          <span className="title">Status:</span> Assistant Professor
        </div>
        <div className="connect">
          <IonIcon icon={logoGithub} className="icons" onClick={()=>window.location.href="https://github.com/mirzaazwad"}></IonIcon>
          <IonIcon icon={logoLinkedin} className="icons" onClick={()=>window.location.href="https://bd.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4"}></IonIcon>
        </div>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header className="header">Sadat Arefin Rafat(Industry Supervisor)</Card.Header>
      <Card.Body>
        <div>
        <span className="title">Institute:</span> Islamic University of Technology(IUT), Board Bazar, Gazipur, Dhaka, Bangladesh
        </div>
        <div>
          <span className="title">Status:</span> Software Engineer(HawarIT Limited)
        </div>
        <div className="connect">
          <IonIcon icon={logoGithub} className="icons" onClick={()=>window.location.href="https://github.com/mirzaazwad"}></IonIcon>
          <IonIcon icon={logoLinkedin} className="icons" onClick={()=>window.location.href="https://bd.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4"}></IonIcon>
        </div>
      </Card.Body>
    </Card>
    </div>
  </div>  
  );
}
 
export default AboutUs;