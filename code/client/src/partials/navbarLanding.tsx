import {Navbar,Container, Nav} from 'react-bootstrap';

const NavbarLanding = () => {
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
    <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
      <Navbar.Brand className='px-2' href="#">DataAnalytica.io</Navbar.Brand>
      <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link href={`/`}>Home</Nav.Link>
            <Nav.Link href={`/about-us`}>About Us</Nav.Link>
            <Nav.Link href={`/signin`}>Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavbarLanding;
