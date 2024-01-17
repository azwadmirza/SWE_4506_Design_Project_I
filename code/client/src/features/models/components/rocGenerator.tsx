import { Line } from "react-chartjs-2";

export interface RocCurveChartProps {
  chartId: string;
  data: {
    auc_scores: { [key: string]: number };
    roc_curves: Array<Array<{ x: number; y: number }>>;
  };
  labels: string[];
  assigned_labels: string[];
}

const RocCurveChart = ({
  data,
  labels,
  assigned_labels,
}: RocCurveChartProps) => {
  const dataset2 = data.roc_curves.map((curve, index) => {
    return {
      id: index,
      label: `${assigned_labels[index]} (AUC: ${data.auc_scores[labels[index]]
        .toPrecision(4)
        .toString()})`,
      data: curve.map((point) => ({ x: point.x, y: point.y })),
    };
  });

  const labels2 = data.roc_curves.map((curve) => curve.map((point) => point.x));

  const data2 = {
    labels: labels2,
    datasets: dataset2,
  };

  return (
    <div className="roc-curve mx-auto w-100 d-flex">
      <div className="chart-container"></div>
      <Line
        data={data2}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: { type: "linear", position: "bottom" },
            y: { type: "linear", position: "left" },
          },
          plugins: {
            legend: { display: true, position: "top" },
            title: {
              display: true,
              text: [
                "X-Axis:True Positive Rate",
                "Y-Axis: False Positive Rate",
              ],
            },
          },
        }}
      ></Line>
    </div>
  );
};

export default RocCurveChart;
