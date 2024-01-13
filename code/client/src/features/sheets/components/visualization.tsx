import "../assets/css/sheets.css";
import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
import { useAppSelector } from "../../../contexts/file/hooks";
import Charts from "../../visualization/components/charts";
import Header from "./header";
import { useSheets } from "../hooks/useSheets";

const Visualization = () => {
  const file = useAppSelector((state) => state.file.file);
  const {data}=useSheets();
    return (
      <Provider store={store}>
        <div className="sheets">
          <Header filename={file?file:""} data={data}/>
          <div className="render-cells">
            <h2>Visualization</h2>
            {file && (<Charts/>)}
          </div>
        </div>
      </Provider>
    );
};

export default Visualization;
