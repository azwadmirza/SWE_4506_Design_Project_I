import { IonIcon } from "@ionic/react";
import { folder } from "ionicons/icons";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import FileInput from "../../../partials/fileInput";
import { useDropDown } from "../../sheets/hooks/useDropDown";

const FileUploadHeader = () => {
  const {
    showFileUpload,
    setShowFileUpload,
  } = useDropDown();
  return ( 
    <Navbar className="header fixed-top" variant="dark" expand="lg">
      <Container
        fluid
        className="navbarContents px-0 px-lg-5 d-flex justify-content-between"
      >
        <FileInput
              showFileInput={showFileUpload}
              setShowFileInput={setShowFileUpload}
            />
        <Nav><Button variant="success" onClick={() => {
                      setShowFileUpload(!showFileUpload);
                    }}><IonIcon icon={folder}></IonIcon> Upload</Button></Nav>
      </Container>
    </Navbar>
   );
}
 
export default FileUploadHeader;
