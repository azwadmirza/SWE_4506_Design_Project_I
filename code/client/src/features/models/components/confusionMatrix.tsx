import React from 'react';

interface ConfusionMatrixProps {
  data: number[][];
  labels: string[];
  title: string;
  className?: string;
}

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ data, labels, title, className }) => {
  if (!data || !labels) return null;

  return (
    <div className={className}>
      <h2>{title}</h2>
      <table style={{ borderCollapse: 'collapse', padding: '10px' }}>
        <thead>
          <tr>
            <th style={{ fontWeight: 'bold', padding: '10px' }}></th>
            {labels.map((label, index) => (
              <th key={index} style={{ fontWeight: 'bold', padding: '10px',fontSize:"12px" }}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ fontWeight: 'bold', padding: '10px',fontSize:"12px" }}>{labels[rowIndex]}</td>
              {row.map((count, colIndex) => (
                <td
                  key={colIndex}
                  className={`cell ${
                    rowIndex === colIndex ? 'highlighted' : 'not-highlighted'
                  }`}
                >
                  {count}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfusionMatrix;
