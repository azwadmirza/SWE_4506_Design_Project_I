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
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import VisualizationHeader from "./visualization-header";
import Visualization from "./visualization";


const Data = () => {

    const file = useAppSelector((state) => state.file.file);
    const data = useAppSelector((state) => state.file.data);
    const { currentCell, gridRows, viewValue, setViewValue, loading } = useSheets(data);
    const [visualization, setShowVisualization] = useState(false);
    if (gridRows) {
        return (
            <Provider store={store}>
                <div className="sheets">
                    <NavbarUser />
                    <Header filename={`${file !== null ? file.name : ""}`} />
                    {currentCell !== "" && (<ValueDisplay currentCell={currentCell} value={viewValue} setValue={setViewValue} />)}
                    <VisualizationHeader setShowVisualization={setShowVisualization} />
                    <div className="render-cells">
                        {!loading ? (
                            !visualization ? (
                                <RenderCells gridRows={gridRows} />
                            ) : (
                                <Visualization />
                            )
                        ) : (
                            <Loader />
                        )}
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