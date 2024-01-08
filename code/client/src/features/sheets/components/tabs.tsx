// import React from 'react'
// import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/tabs.css";
import Data from "../components/data";
import { SetStateAction, useState } from "react";
import Visualization from "../components/visualization";

function Tabs() {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id: SetStateAction<number>) {
    setToggle(id);
  }
  return (
    <div className="d-flex align-items center justify-content-center">
      <div className="col-6 image p-5 custom-tabs-container">
        <div className={toggle === 1 ? "show-content" : "content"}>
          <Data />
        </div>
        <div className={toggle === 2 ? "show-content" : "content"}>
          <Visualization/>
        </div>
        <ul className="d-flex custom-tabs-list">
          <li className="flex-fill custom-tab" onClick={() => updateToggle(1)}>
            Sheets
          </li>
          <li className="flex-fill custom-tab" onClick={() => updateToggle(2)}>
            Visualization
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Tabs;
