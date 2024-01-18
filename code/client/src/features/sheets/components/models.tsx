import "../assets/css/models.css";
import Loader from "../../../partials/loader";
import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
import { useAppSelector } from "../../../contexts/file/hooks";
import ClassificationModels from "../../models/components/classificationModels";
import RegressionModels from "../../models/components/regressionModels";
import { useEffect, useState } from "react";
import Header from "./header";
import { useSheets } from "../hooks/useSheets";
import { useChart } from "../../visualization/hooks/useChart";
import axios from "axios";
import BestModal from "./best-modal";

const Models = () => {
  const file = useAppSelector((state) => state.file.file);
  const loading = useAppSelector((state) => state.file.loading);
  const url = useAppSelector((state) => state.file.url);
  const [best_model,setBestModel]=useState<any|null>(null);
  const [show,setShow]=useState(false);
  const retrieve_best_model=async()=>{
    axios.post(`${import.meta.env.VITE_BACKEND_REQ_ADDRESS}/api/best/find/`,{
      file_url:url
    }).then((res)=>{
      setShow(true);
      setBestModel(res.data)
    }).catch((err)=>console.log(err))
  }
  useEffect(()=>{
    retrieve_best_model()
  },[])
  const [toggle, setToggle] = useState(1);
  const { supervisedML } = useChart();
  const { data } = useSheets();
  if (!loading) {
    return (
      <Provider store={store}>
        <div className="sheets">
          <Header filename={`${file !== null ? file : ""}`} data={data} />
          <div className="render-cells">
            {best_model && (<BestModal show={show} setShow={setShow} result={best_model}/>)}
            <div className="d-flex align-items center justify-model-center">
              <div className={toggle === 1 ? "show-model" : "model"}>
                <ClassificationModels />
              </div>
              <div className={toggle === 2 ? "show-model" : "model"}>
                <RegressionModels />
              </div>
              <ul className="d-flex model-tabs-list">
                {Array.from(supervisedML.values()).includes(
                  "Classification"
                ) && (
                  <li
                    className={`flex-fill ${
                      toggle == 1 ? "model-selected" : "model-tab"
                    }`}
                    onClick={() => setToggle(1)}
                  >
                    Classification
                  </li>
                )}
                {Array.from(supervisedML.values()).includes("Regression") && (
                  <li
                    className={`flex-fill ${
                      toggle == 2 ? "model-selected" : "model-tab"
                    }`}
                    onClick={() => setToggle(2)}
                  >
                    Regression
                  </li>
                )}
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

export default Models;
