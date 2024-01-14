import ConfusionMatrix from "../confusionMatrix";
import DataMatrix from "../dataMatrix";

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
  }|null;
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
  console.log(dataTest)
  console.log(dataTrain)

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
      </div>
    </div>
  );
};

export default LogisticRegressionResults;
