import React from "react";

type GridProps = {
  gridRows: JSX.Element[] | undefined;
  onCellChange: (Key: string, Value: string) => void;
};

const Grid: React.FC<GridProps> = ({ gridRows, onCellChange }) => {
  return (
    <div className="grid-container">
      <div className="grid">
        {gridRows
          ? gridRows.map((row) =>
              React.cloneElement(row, {
                children: React.Children.map(row.props.children, (cell) =>
                  React.cloneElement(cell, {
                    onCellChange: onCellChange,
                  })
                ),
              })
            )
          : <p>No data available</p>}
      </div>
    </div>
  );
};

export default Grid;
