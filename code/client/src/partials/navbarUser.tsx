import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { cloudUpload } from "ionicons/icons";
import "../assets/css/navbar.css";


const NavbarUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('verification');
    localStorage.removeItem('user_id');
    return navigate("/");
  };
  

  return (
    <Navbar className="customNavbar fixed-top " variant="dark" expand="lg">
      <Container
        fluid
        className="navbarContents px-0 px-lg-5 d-flex justify-content-between"
      >
        <Navbar.Brand className="px-2">
          <Link to="/profile" className="px-2 navbar-brand">
            DataAnalytica.io
          </Link>
        </Navbar.Brand>
        <Button className="mobileIcons bg-transparent me-3">
          <IonIcon icon={cloudUpload}>Upload Dataset</IonIcon>
        </Button>
        <Navbar.Toggle className="px-2" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="/profile"
              active={location.pathname === "/profile"}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/data"
              active={location.pathname === "/data"}
            >
              Data
            </Nav.Link>
            <Nav.Link className="d-block d-lg-none c" onClick={handleLogout}>
              Log Out
            </Nav.Link>
          </Nav>
          <div>
          </div>
          <div className="customLogOut d-none d-lg-flex justify-content-end">
            <Button className="btn customButton" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUser;
