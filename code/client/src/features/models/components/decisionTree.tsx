import "../assets/css/models.css";
import "../assets/css/decisionTree.css";
import { useState, ChangeEvent } from "react";
import { useChart } from "../../visualization/hooks/useChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import axios from "axios";
import DecisionTreeResults from "./decisionTreeResults";

const DecisionTree = () => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(80);
  const [maxDepth, setMaxDepth] = useState(3);
  const [criterion, setCriterion] = useState("gini");
  const { optionsPlot } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState(
    optionsPlot[optionsPlot.length - 1]
  );
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const handleRunDecisionTree = async () => {
    console.log("Run Decision Tree", {
      file_url,
      targetVariable,
      normalization,
      trainTestSplit,
      maxDepth,
      criterion,
    });
    try {
      const response = await axios.post(`${address}/api/decision_tree/start/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_depth: maxDepth,
        criterion: criterion,
      });
      console.log("Backend response received:", response.data);
      setEvaluationResults(response.data)
    } catch (error) {
      console.error("Error during backend request:");
    }
  };
  const handleTrainTestSplitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (!isNaN(value)) {
      const clampedValue = Math.min(100, Math.max(0, value));
      setTrainTestSplit(clampedValue);
    }
  };

  const handleMaxDepthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setMaxDepth(value);
    }
  };
  return (
    <div>
      <div className="decision-tree-container-wrapper">
        <div className="decision-tree-container">
          <h3>Logistic Regression</h3>
          <div className="decision-tree-label">
            <label className="decision-tree-label">Target Variable:</label>
            <select
              id="dropdown"
              className="decision-tree-select"
              value={targetVariable}
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
            <label className="decision-tree-label">Normalization:</label>
            <select
              className="decision-tree-select"
              value={normalization}
              onChange={(e) => setNormalization(e.target.value)}
            >
              <option value="MinMaxScaler">MinMax Scaler</option>
              <option value="StandardScaler">Standard Scaler</option>
              <option value="RobustScaler">RobustScaler (Median)</option>
            </select>
          </div>
          <div>
            <label className="decision-tree-label">Train Test Split:</label>
            <input
              className="decision-tree-input"
              type="number"
              value={trainTestSplit}
              onChange={handleTrainTestSplitChange}
            />
          </div>
          <div>
            <label className="decision-tree-label">Max Depth:</label>
            <input
              className="decision-tree-input"
              type="number"
              value={maxDepth}
              onChange={handleMaxDepthChange}
            />
          </div>
          <div>
            <label className="decision-tree-label">Criterion:</label>
            <select
              className="decision-tree-select"
              value={criterion}
              onChange={(e) => setCriterion(e.target.value)}
            >
              <option value="gini">Gini</option>
              <option value="entropy">Entropy</option>
              <option value="log_loss">Log Loss</option>
            </select>
          </div>
          <button
            className="decision-tree-button"
            onClick={handleRunDecisionTree}
          >
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