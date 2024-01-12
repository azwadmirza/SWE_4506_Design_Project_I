import "../assets/css/models.css";
import { useState } from "react";
import DecisionTree from "./decisionTree";

const RegressionModels = () => {
  const [toggle, setToggle] = useState(1);
    return (
        <div className="sheets">
              <ul className="d-flex model-tabs-list">
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(1)}
                >
                  Decision Tree
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(2)}
                >
                  Logistic Regression
                </li>
              </ul>
            <div className="d-flex align-items center justify-content-center">
              <div className={toggle === 1 ? "show-model" : "model"}>
                <DecisionTree/>
              </div>
              <div className={toggle === 2 ? "show-model" : "model"}>
                <h1>This is Logistic Regression</h1>
              </div>
            </div>
          </div>
    );
};

export default RegressionModels;
