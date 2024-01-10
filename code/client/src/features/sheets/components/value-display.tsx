import {Navbar,Container} from 'react-bootstrap';

type ValueDisplayProps = {
    currentCell:string;
    value:string;
    setValue:React.Dispatch<React.SetStateAction<string>>;
}

const ValueDisplay = ({currentCell,value,setValue}:ValueDisplayProps) => {
  return (
    <Navbar className='value-display fixed-top' variant="dark" expand="lg">
    <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
    <div className='cell-name'>{currentCell}</div>
    <div className="input-field">
        <input type="text" id="input" value={value} onChange={(e)=>setValue(e.target.value)} className="form-control" placeholder="Value"/>
    </div>
    </Container>
  </Navbar>
  );
};

export default ValueDisplay;
