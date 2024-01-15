import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import Loader from "../../../../partials/loader";
import { useDecisionTreeRegression } from "../../hooks/useDecisionTreeRegression";
import DecisionTreeResults from "./decisionTreeRegressionResults";
import { ColorSwitch } from "../pcaSwitch";

const DecisionTree = () => {
  const {
    supervisedML,
    pca,
    handleSwitchChange,
    handleInference,
    targetVariable,
    setTargetVariable,
    optionsPlot,
    normalization,
    setNormalization,
    trainTestSplit,
    setTrainTestSplit,
    maxDepth,
    setMaxDepth,
    criterion,
    setCriterion,
    evaluationResults,
    errorMessage,
    handleRunDecisionTree,
    loader,
  } = useDecisionTreeRegression();

  return (
    <div>
      <div className="d-flex model-container-wrapper">
        <div className="model-container">
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px",
            }}
          >
            <ColorSwitch onChange={handleSwitchChange} checked={pca} />
          </div>
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
              value={targetVariable ? targetVariable : "Select a Target"}
              onChange={(e) => setTargetVariable(e.target.value)}
              required
            >
              <option key={null} value="Select a Target">
                Select a Target
              </option>
              {optionsPlot
                ?.slice()
                .reverse()
                .filter((option) => supervisedML.get(option) === "Regression")
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
              <option value="friedman_mse">Friedman MSE</option>
              <option value="squared_error">Squared Error</option>
              <option value="poisson">Poisson</option>
              <option value="absolute_error">Absolute Error</option>
            </select>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button className="model-button" onClick={handleRunDecisionTree}>
            Run
          </button>
          <button className="inference-button" onClick={handleInference}>
            Optimize
          </button>
        </div>
        <div className="results-container">
          {loader ? (
            <Loader />
          ) : (
            <DecisionTreeResults
              modelData={evaluationResults}
              target={targetVariable}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
