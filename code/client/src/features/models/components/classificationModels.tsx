import "../assets/css/models.css";
import { useState } from "react";

const ClassificationModels = () => {
  const [toggle, setToggle] = useState(1);
    return (
        <div className="sheets">
              <ul className="d-flex model-tabs-list">
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(1)}
                >
                  Linear Regression
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(2)}
                >
                  Naive Bayes
                </li>
              </ul>
            <div className="d-flex align-items center justify-content-center">
              <div className={toggle === 1 ? "show-model" : "model"}>
                <h1>This is Linear Regression</h1>
              </div>
              <div className={toggle === 2 ? "show-model" : "model"}>
                <h1>This is Naive Bayes Model</h1>
              </div>
            </div>
          </div>
    );
};

export default ClassificationModels;
