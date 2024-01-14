import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import { useState, ChangeEvent, useEffect } from "react";
import { useChart } from "../../../visualization/hooks/useChart";
import { useAppSelector } from "../../../../contexts/file/hooks";
import axios from "axios";
import DecisionTreeResults from "./decisionTreeResults";

const DecisionTree = () => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxDepth, setMaxDepth] = useState(3);
  const [criterion, setCriterion] = useState("gini");
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

  const handleRunDecisionTree = async () => {
    try {
      const response = await axios.post(`${address}/api/decision_tree/start/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_depth: maxDepth,
        criterion: criterion,
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
          <h5>
            Decision
            <br />
            Tree
          </h5>
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
              min={1}
              max={99}
              value={trainTestSplit}
              onChange={(e) => setTrainTestSplit(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Max Depth:</label>
            <input
              className="model-input"
              type="number"
              value={maxDepth}
              min={1}
              // max={100}
              onChange={(e) => setMaxDepth(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Criterion:</label>
            <select
              className="model-select"
              value={criterion}
              onChange={(e) => setCriterion(e.target.value)}
            >
              <option value="gini">Gini</option>
              <option value="entropy">Entropy</option>
              <option value="log_loss">Log Loss</option>
            </select>
          </div>
          <button className="model-button" onClick={handleRunDecisionTree}>
            Run
          </button>
        </div>
        <div className="results-container">
          <DecisionTreeResults data={evaluationResults} />
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
