import RenderCells from "../components/render-cells";
import '../assets/css/sheets.css';
import Header from "../components/header";
import ValueDisplay from "../components/value-display";
import { useSheets } from "../hooks/useSheets";
import Loader from "../../../partials/loader";
import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";


const Data = () => {
    const { currentCell, gridRows, viewValue, setViewValue, loading, onCellChange  } = useSheets();
    if (!loading) {
        return (
            <Provider store={store}>
                <div className="sheets">
                    {currentCell !== "" && (<ValueDisplay currentCell={currentCell} value={viewValue} setValue={setViewValue} />)}
                    <div className="render-cells">
                        <RenderCells gridRows={gridRows} onCellChange={onCellChange} />
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