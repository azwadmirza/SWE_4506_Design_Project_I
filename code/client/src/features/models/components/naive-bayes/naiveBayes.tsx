import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import NaiveBayesResults from "./naiveBayesResults";
import Loader from "../../../../partials/loader";
import { useNaiveBayes } from "../../hooks/useNaiveBayes";

const NaiveBayes = () => {
  const {normalization,setNormalization,trainTestSplit,setTrainTestSplit,maxIter,setMaxIter,smoothing,setSmoothing,evaluationResults,targetVariable,setTargetVariable,loader,handleRunNaiveBayes,optionsPlot,supervisedML}=useNaiveBayes();
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
          <button className="model-button" onClick={handleRunNaiveBayes} disabled={targetVariable==="Select a Target"?true:false}>
            Run
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
