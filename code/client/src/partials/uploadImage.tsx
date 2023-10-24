import { Modal } from "react-bootstrap";

interface UploadImageProps{
  modal:{
    show:boolean;
    setShow:React.Dispatch<React.SetStateAction<boolean>>;
  };
  setImage:React.Dispatch<React.SetStateAction<File | undefined>>;
  handleSubmit:() => Promise<void>;
}

const UploadImage = ({modal,setImage,handleSubmit}:UploadImageProps) => {
  return ( 
    <Modal show={modal.show}
          onHide={() => modal.setShow(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Upload Profile Picture</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group flex">
          <input type="file" name="file"
                      accept="image/*"
                      id="imageFileProfile"  className="form-control" onChange={(e) => {
                        if(e.target.files!==null){
                          setImage(e.target.files[0])
                        }
                        }}/>
        </div>
        </Modal.Body>
        <Modal.Footer>
                    <button  className="custom-button full-width" onClick={()=>handleSubmit()}>
                      OK
                    </button>
          
        </Modal.Footer>
      </Modal>
   );
}
 
export default UploadImage;