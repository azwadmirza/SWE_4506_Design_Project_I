import "../assets/css/sheets.css";
import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
import { useAppSelector } from "../../../contexts/file/hooks";
import Charts from "../../visualization/components/charts";

const Visualization = () => {
  const file = useAppSelector((state) => state.file.file);
    return (
      <Provider store={store}>
        <div className="sheets">
          <div className="render-cells">
            <h2>Visualization</h2>
            {file && (<Charts/>)}
          </div>
        </div>
      </Provider>
    );
};

export default Visualization;
