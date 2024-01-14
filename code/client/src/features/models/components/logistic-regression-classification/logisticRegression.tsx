import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import { useState, useEffect } from "react";
import { useChart } from "../../../visualization/hooks/useChart";
import { useAppSelector } from "../../../../contexts/file/hooks";
import axios from "axios";
import LogisticRegressionResults from "./logisticRegressionResults";
import Loader from "../../../../partials/loader";

const LogisticRegression = () => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxIter, setMaxIter] = useState(3);
  const [penalty, setPenalty] = useState("none");
  const { optionsPlot } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string | null>();
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (optionsPlot && optionsPlot.length > 0) {
      setTargetVariable(optionsPlot[optionsPlot.length - 1]);
    }
  }, [optionsPlot]);

  const handleRunLogisticRegression = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${address}/api/logistic_regression/start/`,
        {
          file_url: file_url,
          target: targetVariable,
          normalization: normalization,
          train_test_split: trainTestSplit,
          max_iter: maxIter,
          penalty: penalty,
        }
      );
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return (
    <div>
      <div className="model-container-wrapper d-flex">
        <div className="model-container">
          <h5>Logistic Regression</h5>
          <div className="model-label">
            <label className="model-label">Target Variable:</label>
            <select
              id="dropdown"
              className="model-select"
              value={targetVariable ? targetVariable : ""}
              onChange={(e) => setTargetVariable(e.target.value)}
            >
              {optionsPlot
                ?.slice()
                .reverse()
                .map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="model-label">Normalization:</label>
            <select
              className="model-select"
              value={normalization}
              onChange={(e) => setNormalization(e.target.value)}
            >
              <option value="MinMaxScaler">MinMax Scaler</option>
              <option value="StandardScaler">Standard Scaler</option>
              <option value="RobustScaler">Robust Scaler</option>
            </select>
          </div>
          <div>
            <label className="model-label">Percentage Test Set:</label>
            <input
              className="model-input"
              type="number"
              min={10}
              max={90}
              value={trainTestSplit}
              onChange={(e) => setTrainTestSplit(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Max Iter:</label>
            <input
              className="model-input"
              type="number"
              value={maxIter}
              min={1}
              max={100}
              onChange={(e) => setMaxIter(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Penalty:</label>
            <select
              className="model-select"
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
            >
              <option value="none">None</option>
              <option value="l1">L1</option>
              <option value="l2">L2</option>
            </select>
          </div>
          <button
            className="model-button"
            onClick={handleRunLogisticRegression}
          >
            Run
          </button>
        </div>
        <div className="results-container">
          {loader ? (
            <Loader />
          ) : (
            <LogisticRegressionResults data={evaluationResults} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticRegression;
