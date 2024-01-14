import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export interface RocCurveChartProps {
  chartId: string;
  data: {
    auc_scores: { [key: string]: number };
    roc_curves: Array<Array<{ x: number; y: number }>>;
  };
  labels: string[];
  assigned_labels:string[];
}

const RocCurveChart = ({ chartId, data, labels,assigned_labels }:RocCurveChartProps) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement | null;

    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const datasets = data.roc_curves.map((curve, index) => {
        const score=data.auc_scores[labels[index]].toPrecision(4).toString();
        return { label: `${assigned_labels[index]} (AUC: ${score})`,
        data: curve.length === 2 ? [...curve, { x: 1, y: 1 }] : curve,
        borderColor: getRandomColor(),
        borderWidth: 2,
        fill: false,}
      });

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
          scales: {
            x: { type: 'linear', position: 'bottom' },
            y: { type: 'linear', position: 'left' },
          },
          plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: `ROC Curve - ${chartId}` },
            annotation: {
              annotations: [
                { type: 'line', mode: 'horizontal', scaleID: 'y', value: 1, borderColor: 'black', borderWidth: 1, borderDash: [5, 5], label: { content: 'y = 1', enabled: true } },
                { type: 'line', mode: 'vertical', scaleID: 'x', value: 0, borderColor: 'black', borderWidth: 1, borderDash: [5, 5], label: { content: 'x = 0', enabled: true } },
              ],
            },
          } as any,
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartId, data, labels]);

  return (
    <canvas
      id={chartId}
      width="400"
      height="300"
    ></canvas>
  );
};

export default RocCurveChart;