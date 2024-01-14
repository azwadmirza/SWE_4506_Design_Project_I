import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import { useState, useEffect } from "react";
import { useChart } from "../../../visualization/hooks/useChart";
import { useAppSelector } from "../../../../contexts/file/hooks";
import axios from "axios";
import LinearRegressionResults from "./linearRegressionResults";
import Loader from "../../../../partials/loader";

const LinearRegression = () => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxIter, setMaxIter] = useState(3);
  const [smoothing, setSmoothing] = useState<number>(1);
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

  const handleRunLinearRegression = async () => {
    try {
      setLoader(true);
      const response = await axios.post(`${address}/api/linear_regression/start/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_iter: maxIter,
        smoothing: smoothing,
      });
    //   console.log("Backend response received:", JSON.parse(response.data));
    //   setEvaluationResults(JSON.parse(response.data));
      console.log("Backend response received:", response.data);
      setEvaluationResults(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return (
    <div>
      <div className="model-container-wrapper">
        <div className="model-container">
          <h5>Linear Regression</h5>
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
            <label className="model-label">Smoothing:</label>
            <input
              className="model-input"
              type="number"
              value={smoothing}
              min={1}
              max={10}
              onChange={(e) => setSmoothing(parseInt(e.target.value))}
            />
          </div>
          <button className="model-button" onClick={handleRunLinearRegression}>
            Run
          </button>
        </div>
        <div className="results-container">
          {loader ? (
            <Loader />
          ) : (
            <LinearRegressionResults data={evaluationResults} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LinearRegression;
