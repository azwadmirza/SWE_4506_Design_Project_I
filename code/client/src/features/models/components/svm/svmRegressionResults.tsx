import { useSheets } from "../../../sheets/hooks/useSheets";
import ParityPlot from "../parityPlotGenerator";
import MetricsTable from "../regressionMetrics";

interface ISVMProps {
  modelData: {
    "MAE Test": number;
    "MAE Train": number;
    "MSE Test": number;
    "MSE Train": number;
    "Predictions Whole": number[];
    "R2 Accuracy Test": number;
    "R2 Accuracy Train": number;
    "RMSE Test": number;
    "RMSE Train": number;
  } | null;
  target: string | null | undefined;
}

const SVMResults = ({
  modelData,
  target,
}: ISVMProps) => {
  const { data } = useSheets();
  if (!modelData) return null;
  if (!target) return null;

  const extractColumnValues = (columnName: string | null) => {
    if (!columnName || !data || data.length === 0 || !data[0]) {
      console.error("Invalid columnName or data");
      return [];
    }

    let columnIndex = -1;

    for (let i = 0; i < data[0].length; i++) {
      if (data[0][i] === columnName) {
        columnIndex = i;
        break;
      }
    }

    if (columnIndex === -1) {
      console.error("Column not found:", columnName);
      return [];
    }

    return data.slice(1).map((entry) => (entry && entry[columnIndex]) || null);
  };
  const originalTargetValues = extractColumnValues(target);
  const predictedTargetValues = modelData["Predictions Whole"];

  return (
    <div style={{ marginBottom: "50px" }}>
      <div style={{ marginBottom: "50px", width: "800px" }}>
        <h3>Train Metrics Table</h3>
        <MetricsTable
          tableData={{
            MAE: modelData["MAE Train"],
            MSE: modelData["MSE Train"],
            RMSE: modelData["RMSE Train"],
            "R2 Accuracy": modelData["R2 Accuracy Train"],
          }}
        />
      </div>
      <div style={{ marginBottom: "50px", width: "800px" }}>
        <h3>Test Metrics Table</h3>
        <MetricsTable
          tableData={{
            MAE: modelData["MAE Test"],
            MSE: modelData["MSE Test"],
            RMSE: modelData["RMSE Test"],
            "R2 Accuracy": modelData["R2 Accuracy Test"],
          }}
        />
      </div>
      <div style={{ marginTop: "50px", width: "800px" }}>
        <ParityPlot
          targetColumnValues={originalTargetValues}
          predictedValues={predictedTargetValues}
        />
      </div>
    </div>
  );
};

export default SVMResults;
