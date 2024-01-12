import "../assets/css/models.css";
import Header from "../components/header";
import Loader from "../../../partials/loader";
import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
import { useAppSelector } from "../../../contexts/file/hooks";
import ClassificationModels from "../../models/components/classificationModels";
import RegressionModels from "../../models/components/regressionModels";
import {useState} from 'react';

const Visualization = () => {
  const file = useAppSelector((state) => state.file.file);
  const loading = useAppSelector((state) => state.file.loading);
  const [toggle, setToggle] = useState(2);
  if (!loading) {
    return (
      <Provider store={store}>
        <div className="sheets">
          <Header filename={`${file !== null ? file : ""}`} />
          <div className="render-cells">
          <div className="d-flex align-items center justify-model-center">
        <div className={toggle === 1 ? "show-model" : "model"}>
          <ClassificationModels />
        </div>
        <div className={toggle === 2 ? "show-model" : "model"}>
          <RegressionModels/>
        </div>
        <ul className="d-flex model-tabs-list">
          <li className="flex-fill model-tab" onClick={() => setToggle(1)}>
            Classification
          </li>
          <li className="flex-fill model-tab" onClick={() => setToggle(2)}>
            Regression
          </li>
        </ul>
      </div>
          </div>
        </div>
      </Provider>
    );
  } else {
    return <Loader />;
  }
};

export default Visualization;
