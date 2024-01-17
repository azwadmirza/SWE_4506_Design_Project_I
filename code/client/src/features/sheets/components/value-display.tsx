import {Navbar,Container} from 'react-bootstrap';

type ValueDisplayProps = {
    currentCell:string;
    value:string;
}

const ValueDisplay = ({currentCell,value}:ValueDisplayProps) => {
  return (
    <Navbar className='value-display d-flex' variant="dark" expand="lg">
    <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
    <div className='cell-name'>{currentCell}</div>
    <div className="input-field">
        <input type="text" id="input" value={value} className="form-control" placeholder="Value" disabled={true}/>
    </div>
    </Container>
  </Navbar>
  );
};

export default ValueDisplay;
