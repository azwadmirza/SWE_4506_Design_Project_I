import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useDropDown } from "../hooks/useDropDown";
import FileInput from "../../../partials/fileInput";
import { useAppSelector } from "../../../contexts/file/hooks";
import { indexedDBConfig } from "../../../config/indexeddb";
import saveToBackend from "../../../utils/saveFileToBackend";
import { useAppDispatch } from "../../../contexts/auth/hooks";
import { setFile, setURL } from "../../../contexts/file/slice";

type HeaderProps = {
  filename: string;
  data:any[]|null;
};

const Header = ({ filename,data }: HeaderProps) => {
  const file_id = useAppSelector((state) => state.file.file_id);
  const url=useAppSelector((state) => state.file.url);
  const dispatch=useAppDispatch();
  const {
    showFileDropdown,
    toggleDropdown,
    showFileUpload,
    setShowFileUpload,
  } = useDropDown();

  const handleSave = async() => {
    if(file_id){
      if(url){
        const backendRes = await saveToBackend(
          data,
          file_id,
          filename,
          import.meta.env.VITE_BACKEND_REQ_ADDRESS
        );
        await indexedDBConfig.updateFileURL(data, url,backendRes.data.file_url);
        dispatch(setURL(backendRes.data.file_url));
        dispatch(setFile(filename));
        console.log("File Saved");
      }
    }
  };

  return (
    <Navbar className="header fixed-top" variant="dark" expand="lg">
      <Container
        fluid
        className="navbarContents px-0 px-lg-5 d-flex justify-content-between"
      >
        <Navbar.Brand className="px-2">{filename}</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0 px-2"
          style={{ maxHeight: "150px" }}
          navbarScroll
        >
          <div className="option" onClick={() => toggleDropdown("file")}>
            File
            <FileInput
              showFileInput={showFileUpload}
              setShowFileInput={setShowFileUpload}
            />
            {showFileDropdown && (
              <Dropdown
                show={showFileDropdown}
                onClick={() => toggleDropdown("file")}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setShowFileUpload(!showFileUpload);
                    }}
                  >
                    Open
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSave}>Save</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div className="option">Format</div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
