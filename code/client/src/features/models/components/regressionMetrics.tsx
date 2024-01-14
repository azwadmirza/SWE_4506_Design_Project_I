interface IMetricsTableProps {
    tableData: {
      'MAE': number;
      'MSE': number;
      'RMSE': number;
      'R2 Accuracy': number;
    } | null;
  };

const MetricsTable = ({ tableData }:IMetricsTableProps) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Metric</th>
          <th style={tableHeaderStyle}>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tableData!).map(([metric, value]) => (
          <tr key={metric}>
            <td style={tableCellStyle}>{getMetricLabel(metric)}</td>
            <td style={tableCellStyle}>{formatMetricValue(metric, value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center" as "center",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

const getMetricLabel = (metric: string) => {
  switch (metric) {
    case "MAE":
      return "Mean Absolute Error";
    case "MSE":
      return "Mean Squared Error";
    case "RMSE":
      return "Root Mean Squared Error";
    case "R2 Accuracy":
      return "R-Squared Accuracy";
    default:
      return metric;
  }
};

const formatMetricValue = (metric: string, value: number) => {
    if (metric === "R2 Accuracy"){
        return `${(value*100).toFixed(2)}%`;
      }
      return value.toFixed(2);
};

export default MetricsTable;
