import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { ChartDataset } from 'chart.js';

interface ParityPlotProps {
  targetColumnValues: number[];
  predictedValues: number[];
}

const ParityPlot: React.FC<ParityPlotProps> = ({ targetColumnValues, predictedValues }) => {
  const [chartData, setChartData] = useState<{ datasets: ChartDataset<any, any>[] } | null>(null);

  useEffect(() => {
    if (targetColumnValues && predictedValues && targetColumnValues.length === predictedValues.length) {
      const data = targetColumnValues.map((original, index) => ({
        x: original,
        y: predictedValues[index],
      }));

      setChartData({
        datasets: [
          {
            label: 'Parity Plot',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
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
          options={{
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                  display: true,
                  labelString: 'Original Values',
                },
              },
              y: {
                type: 'linear',
                position: 'left',
                scaleLabel: {
                  display: true,
                  labelString: 'Predicted Values',
                },
              },
            },
          } as any}
        />
      )}
    </div>
  );
};

export default ParityPlot;
