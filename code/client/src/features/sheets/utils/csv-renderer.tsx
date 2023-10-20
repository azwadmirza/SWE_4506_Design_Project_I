import Cell from "../components/cell";

export function renderGrid(
  setCurrentCell: React.Dispatch<React.SetStateAction<string>>,
  setViewValue: React.Dispatch<React.SetStateAction<string>>,
  csvData: string[][]
) {
  const numRows = csvData.length;
  const numCols = csvData[0] ? csvData[0].length : 0;

  const gridRows = [];

  // Create row headers and column headers
  const gridCells = [
    <Cell
      Key={`Index\\Columns`}
      type="row-header index"
      setterCell={setCurrentCell}
      setViewValue={setViewValue}
    />,
  ];

  for (let col = 0; col < numCols; col++) {
    gridCells.push(
      <Cell
        type="column-header"
        Key={`column-header ${col + 1}`}
        setterCell={setCurrentCell}
        setViewValue={setViewValue}
      />
    );
  }

  gridRows.push(
    <div key={`row-${0}`} className="grid-row">
      {gridCells}
    </div>
  );

  // Create data cells
  for (let row = 0; row < numRows; row++) {
    const gridCells = [
      <Cell
        Key={`row-header ${row + 1}`}
        type="row-header"
        setterCell={setCurrentCell}
        setViewValue={setViewValue}
      />,
    ];

    for (let col = 0; col < numCols; col++) {
      gridCells.push(
        <Cell
          Key={`${row}:${col + 1}`}
          type="cell"
          setterCell={setCurrentCell}
          setViewValue={setViewValue}
        />
      );
    }

    gridRows.push(
      <div key={`row-${row + 1}`} className="grid-row">
        {gridCells}
      </div>
    );
  }

  return gridRows;
}
