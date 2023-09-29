import NavbarUser from "../../../partials/navbarUser";
import RenderCells from "../components/render-cells";
import '../assets/css/sheets.css';
import Header from "../components/header";
import { renderGrid } from "../utils/grid-renderer";
import ValueDisplay from "../components/value-display";
import { useParams } from "react-router-dom";
import { useSheets } from "../hooks/useSheets";
import Loader from "../../../partials/loader";

const Data = () => {
    const fileID=useParams<{fileID:string}>().fileID;
    const {currentCell,gridRows,viewValue,setViewValue,loading}=useSheets(fileID);
    return ( 
        <div className="sheets">
            <NavbarUser/>
            <Header filename="File.xlsx"/>
            <ValueDisplay currentCell={currentCell===""?"Unselected":currentCell} value={viewValue} setValue={setViewValue}/>
            <div className="render-cells">
            {(!loading && <RenderCells gridRows={gridRows}/>)||(loading && <Loader/>)}
            </div>
        </div>
     );
}
 
export default Data;