import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import { useState, ChangeEvent, useEffect } from "react";
import { useChart } from "../../../visualization/hooks/useChart";
import { useAppSelector } from "../../../../contexts/file/hooks";
import axios from "axios";
import SVMResults from "./svmResults";

const SVM = () => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [degree, setDegree] = useState(3);
  const [maxIter, setMaxIter] = useState(20);
  const [kernel, setKernel] = useState("linear");
  const { optionsPlot } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string | null>();
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);

  useEffect(() => {
    if (optionsPlot && optionsPlot.length > 0) {
      setTargetVariable(optionsPlot[optionsPlot.length - 1]);
    }
  }, [optionsPlot]);

  const handleRunSVM = async () => {
    try {
      const response = await axios.post(`${address}/api/svm/start/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_iter: maxIter,
        kernel: kernel,
      });
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return (
    <div>
      <div className="model-container-wrapper">
        <div className="model-container">
          <h5>Support Vector Machines</h5>
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
              <option value="RobustScaler">RobustScaler (Median)</option>
            </select>
          </div>
          <div>
            <label className="model-label">Percentage Test Set:</label>
            <input
              className="model-input"
              type="number"
              min={0}
              max={100}
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
            <label className="model-label">Kernel:</label>
            <select
              className="model-select"
              value={kernel}
              onChange={(e) => setKernel(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="rbf">RBF</option>
              <option value="poly">Poly</option>
            </select>
          </div>
          {kernel === "poly" && (
            <div>
              <label className="model-label">Degree:</label>
              <input
                className="model-input"
                type="number"
                min={0}
                value={degree}
                onChange={(e) => setDegree(parseInt(e.target.value))}
              />
            </div>
          )}
          <button className="model-button" onClick={handleRunSVM}>
            Run
          </button>
        </div>
        <div className="results-container">
          <SVMResults data={evaluationResults} />
        </div>
      </div>
    </div>
  );
};

export default SVM;
