import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { ChartDataset } from "chart.js";

interface IParityPlotProps {
  targetColumnValues: number[];
  predictedValues: number[];
}

const ParityPlot = ({
  targetColumnValues,
  predictedValues,
}: IParityPlotProps) => {
  const [chartData, setChartData] = useState<{
    datasets: ChartDataset<any, any>[];
  } | null>(null);

  useEffect(() => {
    if (
      targetColumnValues &&
      predictedValues &&
      targetColumnValues.length === predictedValues.length
    ) {
      const data = targetColumnValues.map((original, index) => ({
        x: original,
        y: predictedValues[index],
      }));

      const diagonalLines: { x: number; y: number }[] = [];
      const originalMaxValue = Math.max(...targetColumnValues);
      const predMaxValue = Math.max(...predictedValues);
      const maxValue =
        originalMaxValue > predMaxValue ? originalMaxValue : predMaxValue;
      for (let i = 0; i <= maxValue; i = i + maxValue / 100) {
        diagonalLines.push({ x: i, y: i });
      }

      setChartData({
        datasets: [
          {
            label: "Parity Plot",
            data,
            backgroundColor: "#B6D7A8",
            borderColor: "#93C47D",
            borderWidth: 1,
          },
          {
            label: "Diagonal Line (x=y)",
            data: diagonalLines,
            backgroundColor: "rgba(255, 0, 0, 1)",
            borderWidth: 1,
            pointHoverRadius: 0,
            pointHitRadius: 0,
          },
        ],
      });
    }
  }, [targetColumnValues, predictedValues]);

  return (
    <div>
      {chartData && (
        <Scatter
          data={chartData}
          options={
            {
              scales: {
                x: [
                  {
                    type: "linear",
                    position: "bottom",
                    scaleLabel: {
                      display: true,
                      labelString: "Original Values",
                    },
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
                y: [
                  {
                    type: "linear",
                    position: "left",
                    scaleLabel: {
                      display: true,
                      labelString: "Predicted Values",
                    },
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            } as any
          }
        />
      )}
    </div>
  );
};

export default ParityPlot;
