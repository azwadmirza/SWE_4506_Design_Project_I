import NavbarUser from "../../../partials/navbarUser";
import RenderCells from "../components/render-cells";
import '../assets/css/sheets.css';
import Header from "../components/header";
import ValueDisplay from "../components/value-display";
import { useSheets } from "../hooks/useSheets";
import Loader from "../../../partials/loader";
import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
import { useAppSelector } from "../../../contexts/file/hooks";
import VisualizationHeader from "./visualization-header";


const Data = () => {
    const html=useAppSelector((state)=>state.file.html);
    const file = useAppSelector((state) => state.file.file);
    const { currentCell, gridRows, viewValue, setViewValue, loading } = useSheets();
    if (!loading) {
        return (
            <Provider store={store}>
                <div className="sheets">
                    <NavbarUser />
                    <Header filename={`${file !== null ? file : ""}`} />
                    {currentCell !== "" && (<ValueDisplay currentCell={currentCell} value={viewValue} setValue={setViewValue} />)}
                    {html && (<VisualizationHeader html={html} />)}
                    <div className="render-cells">
                    <RenderCells gridRows={gridRows} />
                    </div>
                </div>
            </Provider>
        );
    }
    else {
        return (<Loader />)
    }
}

export default Data;