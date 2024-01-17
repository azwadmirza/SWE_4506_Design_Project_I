import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import NaiveBayesResults from "./naiveBayesResults";
import Loader from "../../../../partials/loader";
import LoaderOptimized from "../../../../partials/loaderOptimized";
import { useNaiveBayes } from "../../hooks/useNaiveBayes";
import { ColorSwitch } from "../pcaSwitch";

const NaiveBayes = () => {
  const {
    normalization,
    pca,
    handleSwitchChange,
    errorMessage,
    handleInference,
    setNormalization,
    trainTestSplit,
    setTrainTestSplit,
    smoothing,
    setSmoothing,
    evaluationResults,
    targetVariable,
    setTargetVariable,
    loader,
    handleRunNaiveBayes,
    optionsPlot,
    supervisedML,
    pcaFeatures,
    setPcaFeatures,
    loaderOptimize,
  } = useNaiveBayes();
  return (
    <div>
      <div className="model-container-wrapper d-flex">
        <div className="model-container">
          <h5>
            Naive
            <br />
            Bayes
          </h5>
          <div className="model-label">
            <label className="model-label">Apply PCA</label>
            <div
              style={{
                position: "absolute",
                top: "48px",
                right: "15px",
                padding: "5px",
              }}
            >
              <ColorSwitch onChange={handleSwitchChange} checked={pca} />
            </div>
            {pca && (
              <div>
                <label className="model-label">Number of Features:</label>
                <input
                  className="model-input"
                  type="number"
                  min={1}
                  max={optionsPlot.length-1}
                  value={(pcaFeatures>optionsPlot.length-1)?optionsPlot.length-1:pcaFeatures}
                  onChange={(e) => setPcaFeatures(parseInt(e.target.value))}
                />
              </div>
            )}
          </div>
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
                .filter(
                  (option) => supervisedML.get(option) === "Classification"
                )
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
              value={trainTestSplit>90?90:trainTestSplit}
              onChange={(e) => setTrainTestSplit(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Smoothing (10<sup>-x</sup>):</label>
            <input
              className="model-input"
              type="number"
              value={smoothing>10?10:smoothing}
              min={1}
              max={10}
              onChange={(e) => setSmoothing(parseInt(e.target.value))}
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button className="model-button" onClick={handleRunNaiveBayes}>
            Run
          </button>
          <button className="inference-button" onClick={handleInference}>
              {loaderOptimize ? <LoaderOptimized /> : "Optimize"}
          </button>
        </div>
        <div className="results-container">
          {loader ? <Loader /> : <NaiveBayesResults data={evaluationResults} />}
        </div>
      </div>
    </div>
  );
};

export default NaiveBayes;
