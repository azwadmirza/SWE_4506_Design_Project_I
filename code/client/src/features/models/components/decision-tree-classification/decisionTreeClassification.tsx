import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import DecisionTreeClassificationResults from "./decisionTreeClassificationResults";
import Loader from "../../../../partials/loader";
import { useDecisionTreeClassification } from "../../hooks/useDecisionTreeClassification";

const DecisionTree = () => {
  const {targetVariable,setTargetVariable,optionsPlot,normalization, setNormalization, trainTestSplit, setTrainTestSplit, maxDepth, setMaxDepth, criterion, setCriterion, evaluationResults, handleRunDecisionTree, loader}=useDecisionTreeClassification();

  return (
    <div>
      <div className="d-flex model-container-wrapper">
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
              min={10}
              max={90}
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
              max={100}
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
          {loader ? (
            <Loader />
          ) : (
            <DecisionTreeClassificationResults data={evaluationResults} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
