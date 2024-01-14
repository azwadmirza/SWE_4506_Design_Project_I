import "../assets/css/models.css";
import { useState } from "react";
import DecisionTree from "./decision-tree-classification/decisionTree";
import LogisticRegression from "./logistic-regression-classification/logisticRegression";
import SVM from "./svm-classification/svm";
import NaiveBayes from "./naive-bayes/naiveBayes";
import XGBoost from "./xgboost/xgboostClassifier";

const ClassificationModels = () => {
  const [toggle, setToggle] = useState(3);
    return (
        <div className="sheets">
              <ul className="d-flex model-tabs-list">
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(1)}
                >
                  Logistic Regression
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(2)}
                >
                  Naive Bayes
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(3)}
                >
                  Decision Tree
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(4)}
                >
                  K Nearest Neighbour
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(5)}
                >
                  Support Vector Machines
                </li>
                <li
                  className="flex-fill model-tab"
                  onClick={() => setToggle(6)}
                >
                  XGBoost
                </li>
              </ul>
            <div className="d-flex align-items center justify-content-center">
              <div className={toggle === 1 ? "show-model" : "model"}>
                <LogisticRegression/>
              </div>
              <div className={toggle === 2 ? "show-model" : "model"}>
                <NaiveBayes/>
              </div>
              <div className={toggle === 3 ? "show-model" : "model"}>
                <DecisionTree/>
              </div>
              <div className={toggle === 4 ? "show-model" : "model"}>
                <h1>This is K Nearest Neigbours</h1>
              </div>
              <div className={toggle === 5 ? "show-model" : "model"}>
                <SVM/>
              </div>
              <div className={toggle === 6 ? "show-model" : "model"}>
                <h1><XGBoost/></h1>
              </div>
            </div>
          </div>
    );
};

export default ClassificationModels;