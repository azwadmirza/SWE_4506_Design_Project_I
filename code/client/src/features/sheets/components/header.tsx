import {Navbar,Container, Nav} from 'react-bootstrap';

type HeaderProps = {
    filename:string;
}

const Header = ({filename}:HeaderProps) => {
  return (
    <Navbar className='header fixed-top ' variant="dark" expand="lg">
    <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
    <Navbar.Brand className='px-2' href="#">{filename}</Navbar.Brand>
      <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <div className="option">
                File
            </div>
            <div className="option">
                Edit
            </div>
            <div className="option">
                View
            </div>
            <div className="option">
                Insert
            </div>
            <div className="option">
                Format
            </div>
            <div className="option">
                Data
            </div>
            <div className="option">
                Tools
            </div>
            <div className="option">
                Help
            </div>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Header;
