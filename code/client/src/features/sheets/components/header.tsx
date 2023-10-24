import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useDropDown } from "../hooks/useDropDown";
import FileInput from "../../../partials/fileInput";
import { useEffect } from "react";

type HeaderProps = {
  filename: string;
};

const Header = ({ filename }: HeaderProps) => {
  const { showFileDropdown,
    toggleDropdown,
    showFileUpload,
    setShowFileUpload } = useDropDown();

  return (
    <Navbar className="header fixed-top" variant="dark" expand="lg">
      <Container
        fluid
        className="navbarContents px-0 px-lg-5 d-flex justify-content-between"
      >
        <Navbar.Brand className="px-2">{filename}</Navbar.Brand>
        <Navbar.Toggle className="px-2" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <div className="option" onClick={() => toggleDropdown("file")}>
              File
              <FileInput showFileInput={showFileUpload} setShowFileInput={setShowFileUpload}/>
              {showFileDropdown && (
                <Dropdown
                  show={showFileDropdown}
                  onClick={() => toggleDropdown("file")}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{
                      setShowFileUpload(!showFileUpload);
                    }}>Open</Dropdown.Item>
                    <Dropdown.Item>Save</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            {/* <div className="option" onClick={() => toggleDropdown("edit")}>
              Edit
            </div>
            <div className="option" onClick={() => toggleDropdown("view")}>
              View
            </div>
            <div className="option">Insert</div> */}
            <div className="option">Format</div>
            {/* <div className="option">Data</div>
            <div className="option">Tools</div>
            <div className="option">Help</div> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
