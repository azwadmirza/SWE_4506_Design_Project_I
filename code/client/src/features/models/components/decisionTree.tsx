import "../assets/css/models.css";
import "../assets/css/decisionTree.css";
import { useState } from "react";
import { useLinearChart } from "../../visualization/hooks/useLinearChart";

const DecisionTree = () => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(0.8);
  const [maxDepth, setMaxDepth] = useState(3);
  const [criterion, setCriterion] = useState("gini");
  const { optionsPlot } = useLinearChart();
  const [targetVariable, setTargetVariable] = useState(
    optionsPlot[optionsPlot.length - 1]
  );
  const handleRunDecisionTree = () => {
    console.log("Run Decision Tree", {
      targetVariable,
      normalization,
      trainTestSplit,
      maxDepth,
      criterion,
    });
  };
  return (
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
              ?.slice() // create a shallow copy to avoid mutating the original array
              .reverse() // reverse the order
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
            onChange={(e) => setTrainTestSplit(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="decision-tree-label">Max Depth:</label>
          <input
            className="decision-tree-input"
            type="number"
            value={maxDepth}
            onChange={(e) => setMaxDepth(parseInt(e.target.value))}
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
    </div>
  );
};

export default DecisionTree;
