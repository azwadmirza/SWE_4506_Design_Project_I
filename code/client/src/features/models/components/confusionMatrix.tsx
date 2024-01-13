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
              <th key={index} style={{ fontWeight: 'bold', padding: '10px' }}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ fontWeight: 'bold', padding: '10px' }}>{labels[rowIndex]}</td>
              {row.map((count, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    backgroundColor:
                      rowIndex === colIndex
                        ? 'rgba(144, 238, 144, 0.8)'
                        : 'rgba(255, 99, 71, 0.8)',
                    width: '50px',
                    height: '50px',
                    textAlign: 'center',
                    fontSize: '12px',
                    padding: '10px',
                  }}
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
