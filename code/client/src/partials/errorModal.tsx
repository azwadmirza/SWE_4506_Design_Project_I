import { Modal } from "react-bootstrap";

interface ErrorModalProps{
  error:string;
  setError:React.Dispatch<React.SetStateAction<string>>;
}

const ErrorModal = ({error,setError}:ErrorModalProps) => {
  return ( 
  <Modal show={error!==""} onHide={()=>setError("")} className="error-modal">
  <Modal.Header className="content" closeButton>Error</Modal.Header>
  <Modal.Body>
  <div className="errorBox">
    {error}
  </div>
  </Modal.Body>
</Modal> 
);
}
 
export default ErrorModal;