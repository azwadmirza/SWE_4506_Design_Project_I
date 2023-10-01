import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import React, { useState } from "react";

type HeaderProps = {
  filename: string;
};

const Header = ({ filename }: HeaderProps) => {
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);

  const toggleDropdown = (menuName: string) => {
    setShowFileDropdown(false);
    setShowEditDropdown(false);
    setShowViewDropdown(false);

    switch (menuName) {
      case "file":
        setShowFileDropdown(!showFileDropdown);
        break;
      case "edit":
        setShowEditDropdown(!showEditDropdown);
        break;
      case "view":
        setShowViewDropdown(!showViewDropdown);
        break;
      default:
        break;
    }
  };

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
              {showFileDropdown && (
                <Dropdown
                  show={showFileDropdown}
                  onClick={() => toggleDropdown("file")}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>Open</Dropdown.Item>
                    <Dropdown.Item>Save</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="option" onClick={() => toggleDropdown("edit")}>
              Edit
              {showEditDropdown && (
                <Dropdown
                  show={showEditDropdown}
                  onClick={() => toggleDropdown("edit")}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>Open</Dropdown.Item>
                    <Dropdown.Item>Save</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="option" onClick={() => toggleDropdown("view")}>
              View
              {showViewDropdown && (
                <Dropdown
                  show={showViewDropdown}
                  onClick={() => toggleDropdown("view")}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>Open</Dropdown.Item>
                    <Dropdown.Item>Save</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="option">Insert</div>
            <div className="option">Format</div>
            <div className="option">Data</div>
            <div className="option">Tools</div>
            <div className="option">Help</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
