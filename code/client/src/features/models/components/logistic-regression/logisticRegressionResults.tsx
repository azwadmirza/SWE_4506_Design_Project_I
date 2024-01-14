import ConfusionMatrix from "../confusionMatrix";
import DataMatrix from "../dataMatrix";
import extractRocCurveData from "../rocDataExtraction";
import { RawData } from "../rocDataExtraction";
import RocCurveChart, { RocCurveChartProps } from "../rocGenerator";

interface ILogisticRegressionProps {
  data: {
    "Accuracy Test": number;
    "Accuracy Train": number;
    "Confusion Matrix Test": number[][];
    "Classification Report Test": {
      [key: string]: {
        label: string;
        precision: number;
        recall: number;
        "f1-score": number;
        support: number;
      };
    };
    "Confusion Matrix Train": number[][];
    "Classification Report Train": {
      [key: string]: {
        precision: number;
        recall: number;
        "f1-score": number;
        support: number;
      };
    };
    auc_scores_test: {
      [key: string]: number;
    };
    auc_scores_train: {
      [key: string]: number;
    };
    fpr_test_per_class: {
      [key: string]: number[];
    };
    fpr_train_per_class: {
      [key: string]: number[];
    };
    tpr_test_per_class: {
      [key: string]: number[];
    };
    tpr_train_per_class: {
      [key: string]: number[];
    };
  } | null;
}

const LogisticRegressionResults = ({ data }:ILogisticRegressionProps) => {
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
      <div style={{ marginBottom: "20px" }}>
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
          <RocCurveChart chartId="logistic-regression-train" data={rocCurveTrainData} labels={labelsArray} />
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
          <RocCurveChart chartId="logistic-regression-test" data={rocCurveTestData} labels={labelsArray} />
        </div>
      </div>
    </div>
  );
};

export default LogisticRegressionResults;
