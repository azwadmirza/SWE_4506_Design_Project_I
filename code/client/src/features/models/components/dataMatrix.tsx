import React from 'react';

interface MetricsTableProps {
  data: {
    label: string;
    metrics: {
      precision: number;
      recall: number;
      'f1-score': number;
      support: number;
    };
  }[];
  title: string;
}

const DataMatrix: React.FC<MetricsTableProps> = ({ data, title }) => {
  const roundToDecimalPlaces = (value: number, decimalPlaces: number): number => {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(value * multiplier) / multiplier;
  };

  return (
    <div>
      <h2>{`${title} Metrics Table`}</h2>
      <table style={{ borderCollapse: 'collapse', width: '80%', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={tableHeaderStyle}>Label</th>
            <th style={tableHeaderStyle}>Precision</th>
            <th style={tableHeaderStyle}>Recall</th>
            <th style={tableHeaderStyle}>F1-Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.label} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{item.label}</td>
              <td style={tableCellStyle}>{roundToDecimalPlaces(item.metrics.precision, 3)}</td>
              <td style={tableCellStyle}>{roundToDecimalPlaces(item.metrics.recall, 3)}</td>
              <td style={tableCellStyle}>{roundToDecimalPlaces(item.metrics['f1-score'], 3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px',
  textAlign: 'left',
};

export default DataMatrix;
