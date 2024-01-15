import { useSheets } from "../../../sheets/hooks/useSheets";
import { IRegressionProps } from "../../assets/ts/IRegressionProps";
import ParityPlot from "../parityPlotGenerator";


const DecisionTreeRegressionResults = ({ modelData, target }: IRegressionProps) => {
  const {data}=useSheets();
  if (!modelData) return null;
  if(!target) return null;

  const extractColumnValues = (columnName: string | null) => {
    if (!columnName || !data || data.length === 0 || !data[0]) {
      console.error('Invalid columnName or data');
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
      console.error('Column not found:', columnName);
      return [];
    }
  
    return data.slice(1).map(entry => (entry && entry[columnIndex]) || null);
  };
  const originalTargetValues = extractColumnValues(target);
  const predictedTargetValues = modelData['Predictions Whole'];

  return (
    <div style={{ marginBottom: "50px" }}>
      <div style={{ marginBottom: "120px" }}>
        <div style={{ marginBottom: "15px" }}>
          <h2>Train Mean Absolute Error</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {(modelData["MAE Train"]).toFixed(2)}%
          </p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <h2>Train Mean Squared Error</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {(modelData["MSE Train"]).toFixed(2)}
          </p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <h2>Train Root Mean Squared Error</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {(modelData["RMSE Train"]).toFixed(2)}
          </p>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
      <div style={{ marginBottom: "15px" }}>
          <h2>Test Mean Absolute Error</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {(modelData["MAE Test"]).toFixed(2)}
          </p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <h2>Test Mean Squared Error</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {(modelData["MSE Test"]).toFixed(2)}
          </p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <h2>Test Root Mean Squared Error</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {(modelData["RMSE Test"]).toFixed(2)}
          </p>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
      <ParityPlot targetColumnValues={originalTargetValues} predictedValues={predictedTargetValues} />
      </div>
    </div>
  );
};

export default DecisionTreeRegressionResults;
