import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import LinearRegressionResults from "./linearRegressionResults";
import Loader from "../../../../partials/loader";
import { useLinearRegression } from "../../hooks/useLinearRegression";
import { ColorSwitch } from "../pcaSwitch";

const LinearRegression = () => {
  const {
    normalization,
    pca,
    handleSwitchChange,
    handleInference,
    errorMessage,
    setNormalization,
    trainTestSplit,
    setTrainTestSplit,
    maxIter,
    setMaxIter,
    smoothing,
    setSmoothing,
    evaluationResults,
    targetVariable,
    setTargetVariable,
    loader,
    handleRunLinearRegression,
    optionsPlot,
    supervisedML,
  } = useLinearRegression();

  return (
    <div>
      <div className="model-container-wrapper d-flex">
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
          <h5>Linear Regression</h5>
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button className="model-button" onClick={handleRunLinearRegression}>
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
            <LinearRegressionResults
              modelData={evaluationResults}
              target={targetVariable}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LinearRegression;
