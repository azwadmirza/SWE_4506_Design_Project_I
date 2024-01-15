import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import { useXGBoostRegression } from "../../hooks/useXGBoostRegression";
import Loader from "../../../../partials/loader";
import XGBoostRegressionResults from "./xgboostRegressionResults";

const XGBoost = () => {
  const {
    objective,
    setObjective,
    handleRunXGBoost,
    setTargetVariable,
    setNormalization,
    setTrainTestSplit,
    setMaxDepth,
    setSampleRatio,
    setRegAlpha,
    setRegLambda,
    setBooster,
    setTreeMethod,
    setGrowPolicy,
    evaluationResults,
    normalization,
    trainTestSplit,
    maxDepth,
    subsampleRatio,
    regAlpha,
    regLambda,
    booster,
    treeMethod,
    growPolicy,
    targetVariable,
    optionsPlot,
    supervisedML,
    loader,
    errorMessage,
    handleInference,
  } = useXGBoostRegression();
  return (
    <div>
      <div className="model-container-wrapper d-flex">
        <div className="model-container">
          <h5>XGBoost</h5>
          <div className="model-label">
            <label className="model-label">Target Variable:</label>
            <select
              id="dropdown"
              className="model-select"
              value={targetVariable ? targetVariable : "Select a Target"}
              onChange={(e) => setTargetVariable(e.target.value)}
              required
            >
              <option key={null} value="Select a Target">Select a Target</option>
              {optionsPlot
                ?.slice()
                .reverse()
                .filter((option)=>supervisedML.get(option)==="Regression")
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
            <label className="model-label">Booster:</label>
            <select
              className="model-select"
              value={booster}
              onChange={(e) => setBooster(e.target.value)}
            >
              <option value="dart">Dart</option>
              <option value="gblinear">Gblinear</option>
              <option value="gbtree">Gbtree</option>
            </select>
          </div>
          <div>
            <label className="model-label">Subsample Ratio:</label>
            <input
              className="model-input"
              type="number"
              value={subsampleRatio}
              min="0.1"
              max="1.0"
              step=".01"
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setSampleRatio(newValue > 1.0 ? 1.0 : newValue);
              }}
            />
          </div>
          <div>
            <label className="model-label">L1 Regularization:</label>
            <input
              className="model-input"
              type="number"
              value={regAlpha}
              min={10e-6}
              max={10e6}
              onChange={(e) => setRegAlpha(parseInt(e.target.value))}
            />
            <div>
              <label className="model-label">L2 Regularization:</label>
              <input
                className="model-input"
                type="number"
                value={regLambda}
                min={10e-6}
                max={10e6}
                onChange={(e) => setRegLambda(parseInt(e.target.value))}
              />
            </div>
            <label className="model-label">Tree Method:</label>
            <select
              className="model-select"
              value={treeMethod}
              onChange={(e) => setTreeMethod(e.target.value)}
            >
              <option value="exact">Exact</option>
              <option value="approx">Approx</option>
              <option value="hist">Hist</option>
            </select>
          </div>
          <div>
            <label className="model-label">Grow Policy:</label>
            <select
              className="model-select"
              value={growPolicy}
              onChange={(e) => setGrowPolicy(e.target.value)}
            >
              <option value="depthwise">Depthwise</option>
              <option value="lossguide">Lossguide</option>
            </select>
          </div>
          <div>
            <label className="model-label">Objective Function:</label>
            <select
              className="model-select"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            >
              <option value="depthwise">Depthwise</option>
              <option value="lossguide">Lossguide</option>
              <option value="reg:squarederror">Squared Error</option>
              <option value="reg:squaredlogerror">Squared Log Error</option>
              <option value="reg:logistic">Logistic</option>
              <option value="reg:linear">Linear</option>
              <option value="reg:pseudohubererror">Pseudo-Huber Error</option>
              <option value="reg:gamma">Gamma</option>
              <option value="reg:tweedie">Tweedie</option>
              <option value="reg:absoluteerror">Absolute Error</option>
            </select>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button className="model-button" onClick={handleRunXGBoost}>
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
            <XGBoostRegressionResults
              modelData={evaluationResults}
              target={targetVariable}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default XGBoost;
