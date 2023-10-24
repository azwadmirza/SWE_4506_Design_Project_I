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
import { useEffect } from "react";


const Data = () => {
    
    const file=useAppSelector((state)=>state.file.file);
    const data=useAppSelector((state)=>state.file.data);
    const {currentCell,gridRows,viewValue,setViewValue,loading}=useSheets(data);
    if(gridRows){
        return ( 
            <Provider store={store}>
                <div className="sheets">
                <NavbarUser/>
                <Header filename={`${file!==null?file.name:""}`}/>
                {currentCell!=="" && (<ValueDisplay currentCell={currentCell} value={viewValue} setValue={setViewValue}/>)}
                <div className="render-cells">
                {(!loading && <RenderCells gridRows={gridRows}/>)||(loading && <Loader/>)}
                </div>
            </div>
            </Provider>
         );
    }
    else{
        return (<Loader/>)
    }
}

export default Data;