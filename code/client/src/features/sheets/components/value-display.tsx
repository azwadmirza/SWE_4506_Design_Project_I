import {Navbar,Container, Nav} from 'react-bootstrap';

type ValueDisplayProps = {
    currentCell:string;
}

const ValueDisplay = ({currentCell}:ValueDisplayProps) => {
  return (
    <Navbar className='value-display fixed-top ' variant="dark" expand="lg">
    <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
    <div className='cell-name'>{currentCell}</div>
    <div className="input-field">
        <input type="text" id="input" className="form-control" placeholder="Value"/>
    </div>
    </Container>
  </Navbar>
  );
};

export default ValueDisplay;
