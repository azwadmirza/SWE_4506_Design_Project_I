import NavbarUser from "../../../partials/navbarUser";
import RenderCells from "../components/render-cells";
import '../assets/css/sheets.css';
import Header from "../components/header";
import { renderGrid } from "../utils/grid-renderer";
import ValueDisplay from "../components/value-display";

const Sheets = () => {
    return ( 
        <div className="sheets">
            <NavbarUser/>
            <Header filename="File.xlsx"/>
            <ValueDisplay currentCell="A1"/>
            <div className="render-cells">
            <RenderCells gridRows={renderGrid()}/>
            </div>
        </div>
     );
}
 
export default Sheets;