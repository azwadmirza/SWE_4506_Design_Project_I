import Cell from "../components/cell";

const createCell = (
  type: string,
  Key: string,
  Value: string,
  onCellChange: (value: string) => void,
  setCurrentCell: React.Dispatch<React.SetStateAction<string>>,
  setViewValue: React.Dispatch<React.SetStateAction<string>>
) => (
  <Cell
    type={type}
    Key={Key}
    Value={Value}
    setterCell={setCurrentCell}
    setViewValue={setViewValue}
    onCellChange={(value) => onCellChange(value)}
  />
);

export const renderGrid = async (
  data: any[]|null,
  setCurrentCell: React.Dispatch<React.SetStateAction<string>>,
  setViewValue: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onCellChange: (Key: string, Value: string) => void
) => {
  let numRows = 200;
  let numCols = 200;
  if(data === null) {
    setLoading(false);
    return [];
  }
  numRows = data.length;
  numCols = data[0]?.length;
  const gridRows: JSX.Element[] = [];
  if (numRows === 0) {
    setLoading(false);
    return gridRows;
  }

  const gridCells = [
    createCell("row-header index", "Index\\Columns", "Index\\Columns", (value) => onCellChange("Index\\Columns", value), setCurrentCell, setViewValue),
  ];

  if (numCols === 0) {
    for (let col = 0; col < numRows; col++) {
      const cellKey = `${col}`;
      gridCells.push(createCell("column-header", `${data[col]}`, `${data[col]}`, (value) => onCellChange(cellKey, value), setCurrentCell, setViewValue));
    }
    gridRows.push(
      <div key={`row-${0}`} className="grid-row">
        {gridCells}
      </div>
    );
    setLoading(false);
    return gridRows;
  }

  for (let col = 0; col < numCols; col++) {
    const cellKey = `${data[0][col]}`;
    gridCells.push(createCell("column-header", `${data[0][col]}`, `${data[0][col]}`, (value) => onCellChange(cellKey, value), setCurrentCell, setViewValue));
  }

  gridRows.push(
    <div key={`row-${0}`} className="grid-row">
      {gridCells}
    </div>
  );

  for (let row = 1; row < numRows; row++) {
    const gridCells = [
      createCell("row-header", `${row}`, `${row}`, (value) => onCellChange(`${row}`, value), setCurrentCell, setViewValue),
    ];

    for (let col = 0; col < numCols; col++) {
      const cellKey = `${row}:${data[0][col]}`;
      gridCells.push(createCell("cell", `${row}:${data[0][col]}`, `${data[row][col]}`, (value) => onCellChange(cellKey, value), setCurrentCell, setViewValue));
    }

    gridRows.push(
      <div key={`row-${row}`} className="grid-row">
        {gridCells}
      </div>
    );
  }
  setLoading(false);
  return gridRows;
};
