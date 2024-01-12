import "../assets/css/tabs.css";
import Data from "../components/data";
import Visualization from "../components/visualization";
import Models from "../components/models";
import { useState } from "react";
import { useAppSelector } from "../../../contexts/file/hooks";
import Header from "./header";

function Tabs() {
  const [toggle, setToggle] = useState(1);
  const file=useAppSelector((state)=>state.file.file);
  return (
    <div className="d-flex align-items center justify-content-center">
      <div className="col-6 image p-5 custom-tabs-container">
      <Header filename={`${file !== null ? file : ""}`} />
        <div className={toggle === 1 ? "show-content" : "content"}>
          <Data />
        </div>
        <div className={toggle === 2 ? "show-content" : "content"}>
          <Visualization/>
        </div>
        <ul className="d-flex custom-tabs-list">
          <li className="flex-fill custom-tab" onClick={() => setToggle(1)}>
            Sheets
          </li>
          <li className="flex-fill custom-tab" onClick={() => setToggle(2)}>
            Visualization
          </li>
        </ul>
      </div>
      <div className={toggle === 2 ? "show-content" : "content"}>
        <Visualization/>
      </div>
      <div className={toggle === 3 ? "show-content" : "content"}>
        <Models/>
      </div>
      <ul className="d-flex custom-tabs-list">
        <li className="flex-fill custom-tab" onClick={() => setToggle(1)}>
          Sheets
        </li>
        <li className="flex-fill custom-tab" onClick={() => setToggle(2)}>
          Visualization
        </li>
        <li className="flex-fill custom-tab" onClick={() => setToggle(3)}>
          Models
        </li>
      </ul>
    </div>
  );
}

export default Tabs;
