import Loader from "../../../partials/loader";
import "../assets/css/tabs.css";
import Data from "../components/data";
import Visualization from "../components/visualization";
import { useTabs } from "../hooks/useTabs";
import Models from "./models";

function Tabs() {
  const { updateToggle, toggle,loading }=useTabs();
  if(loading){
    return (
      <Loader/>
    )
  }
  else{
    return (
      <div className="d-flex align-items center justify-content-center">
        <div className={toggle === 1 ? "show-content" : "content"}>
          <Data />
        </div>
        <div className={toggle === 2 ? "show-content" : "content"}>
          <Visualization/>
        </div>
        <div className={toggle === 3 ? "show-content" : "content"}>
          <Models/>
        </div>
        <ul className="d-flex custom-tabs-list">
          <li className="flex-fill custom-tab" onClick={() => updateToggle(1)}>
            Sheets
          </li>
          <li className="flex-fill custom-tab" onClick={() => updateToggle(2)}>
            Visualization
          </li>
          <li className="flex-fill custom-tab" onClick={() => updateToggle(3)}>
            Models
          </li>
        </ul>
      </div>
    );
  }
}

export default Tabs;
