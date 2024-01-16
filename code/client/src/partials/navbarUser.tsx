import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { useAppDispatch } from "../contexts/auth/hooks";
import { clearTokens } from "../contexts/auth/slice";


const NavbarUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useAppDispatch();
  const handleLogout = () => {
    dispatch(clearTokens());
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  

  return (
    <Navbar className="customNavbar fixed-top d-flex fluid" variant="dark" expand="lg">
      <Container
        fluid
        className="navbarContents px-0 px-lg-5 d-flex justify-content-between"
      >
        <Navbar.Brand className="px-2">
          <Link to="/dashboard" className="px-2 navbar-brand">
            DataAnalytica.io
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="px-2" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="navbarMobile">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: "150px",zIndex:20 }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="/dashboard"
              active={location.pathname === "/dashboard" || location.pathname === "/data"}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              active={location.pathname === "/profile"}
            >
              Profile
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
