import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import LogisticRegressionResults from "./logisticRegressionResults";
import Loader from "../../../../partials/loader";
import { useLogisticRegression } from "../../hooks/useLogisticRegression";

const LogisticRegression = () => {
  const {normalization,setNormalization,trainTestSplit,setTrainTestSplit,maxIter,setMaxIter,penalty,setPenalty,evaluationResults,targetVariable,setTargetVariable,loader,handleRunLogisticRegression,optionsPlot,supervisedML}=useLogisticRegression();

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
              value={targetVariable ? targetVariable : "Select a Target"}
              onChange={(e) => setTargetVariable(e.target.value)}
              required
            >
              <option key={null} value="Select a Target">Select a Target</option>
              {optionsPlot
                ?.slice()
                .reverse()
                .filter((option)=>supervisedML.get(option)==="Classification")
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
            disabled={targetVariable==="Select a Target"?true:false}
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
