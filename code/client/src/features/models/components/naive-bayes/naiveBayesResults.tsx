import { IClassificationProps } from "../../assets/ts/IClassificationProps";
import ConfusionMatrix from "../confusionMatrix";
import DataMatrix from "../dataMatrix";
import extractRocCurveData from "../../assets/ts/rocDataExtraction";
import { RawData } from "../../assets/ts/rocDataExtraction";
import RocCurveChart, { RocCurveChartProps } from "../rocGenerator";

const NaiveBayesResults = ({ data }:IClassificationProps) => {
  if (!data) return null;

  const labelsArray = [];
  const classificationReportTest = data["Classification Report Test"];

  for (const [label] of Object.entries(classificationReportTest)) {
    if (label.toLowerCase() === "accuracy") {
      break;
    }
    labelsArray.push(label);
  }

  const rawTestData: RawData = {
    auc_scores: data["auc_scores_test"],
    fpr_per_class: data["fpr_test_per_class"],
    tpr_per_class: data["tpr_test_per_class"],
  };

  const rocCurveTestData: RocCurveChartProps["data"] = extractRocCurveData(
    rawTestData,
    labelsArray
  );

  const rawTrainData: RawData = {
    auc_scores: data["auc_scores_train"],
    fpr_per_class: data["fpr_train_per_class"],
    tpr_per_class: data["tpr_train_per_class"],
  };

  const rocCurveTrainData: RocCurveChartProps["data"] = extractRocCurveData(
    rawTrainData,
    labelsArray
  );


  const dataTest = [];

  for (const [label, metrics] of Object.entries(data["Classification Report Test"])) {
    if (label.toLowerCase() === "accuracy") {
      break;
    }
    dataTest.push({ label, metrics });
  }
  const dataTrain = [];

  for (const [label, metrics] of Object.entries(data["Classification Report Train"])) {
    if (label.toLowerCase() === "accuracy") {
      break;
    }
    dataTrain.push({ label, metrics });
  }



  return (
    <div style={{ marginBottom: "50px" }}>
      <div style={{ marginBottom: "120px" }}>
        <div style={{ marginBottom: "15px" }}>
          <h2>Train Accuracy</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          {(data["Accuracy Train"] * 100).toFixed(2)}%
          </p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <ConfusionMatrix
            data={data["Confusion Matrix Train"]}
            labels={labelsArray}
            title="Confusion Matrix Train"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <DataMatrix
            data={dataTrain}
            title="Train"
          />
        </div>
        <div style={{ marginBottom: "15px", width: "700px", height: "450px" }}>
          <h2>ROC Curve-Train</h2>
          <RocCurveChart chartId="Naive Bayes Train" data={rocCurveTrainData} labels={labelsArray} assigned_labels={labelsArray}/>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "green", fontSize: "15px", margin: "0" }}>
              AUC greater than 0.5: Model Prediction is better than Random guess.
            </p>
            <p style={{ color: "green", fontSize: "15px", margin: "0", marginTop: "5px"}}>
              Higher AUC signifies Effective performance of the model
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <div style={{ marginBottom: "15px" }}>
          <h2>Test Accuracy</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
           {(data["Accuracy Test"] * 100).toFixed(2)}%
          </p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <ConfusionMatrix
            data={data["Confusion Matrix Test"]}
            labels={labelsArray}
            title="Confusion Matrix Test"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <DataMatrix
            data={dataTest}
            title="Test"
          />
        </div>
        <div style={{ marginBottom: "15px", width: "700px", height: "450px" }}>
          <h2>ROC Curve-Test</h2>
          <RocCurveChart chartId="Naive Bayes Test" data={rocCurveTestData} labels={labelsArray} assigned_labels={labelsArray}/>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "green", fontSize: "15px", margin: "0" }}>
              AUC greater than 0.5: Model Prediction is better than Random guess.
            </p>
            <p style={{ color: "green", fontSize: "15px", margin: "0", marginTop: "5px"}}>
              Higher AUC signifies Effective performance of the model
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaiveBayesResults;
