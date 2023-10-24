import Cell from "../components/cell";

export function renderGrid(data: any[], setCurrentCell: React.Dispatch<React.SetStateAction<string>>, setViewValue: React.Dispatch<React.SetStateAction<string>>) {
  let numRows = 200;
  let numCols = 200;
  numRows = data.length;
  numCols = data[0]?.length;
  const gridRows = [];
  const gridCells = [<Cell Key={`Index\\Columns`}  Value={`Index\\Columns`} type="row-header index" setterCell={setCurrentCell} setViewValue={setViewValue} />];

  if (numCols === 0) {
    for (let col = 0; col < numRows; col++) {
      gridCells.push(<Cell type="column-header" Key={`${data[col]}`} Value={`${data[col]}`} setterCell={setCurrentCell} setViewValue={setViewValue} />);
    }
    gridRows.push(
      <div key={`row-${0}`} className="grid-row">
        {gridCells}
      </div>
    );
    console.log(gridRows);
    return gridRows;
  }
  for (let col = 0; col < numCols; col++) {
    gridCells.push(<Cell type="column-header" Key={`${data[0][col]}`} Value={`${data[0][col]}`} setterCell={setCurrentCell} setViewValue={setViewValue} />);
  }


  gridRows.push(
    <div key={`row-${0}`} className="grid-row">
      {gridCells}
    </div>
  );

  for (let row = 1; row < numRows; row++) {
    const gridCells = [<Cell Key={`${row}`} Value={`${row}`} type="row-header" setterCell={setCurrentCell} setViewValue={setViewValue} />];


    for (let col = 0; col < numCols; col++) {
      gridCells.push(<Cell Key={`${row}:${data[0][col]}`} Value={`${data[row][col]}`} type="cell" setterCell={setCurrentCell} setViewValue={setViewValue} />);
    }


    gridRows.push(
      <div key={`row-${row}`} className="grid-row">
        {gridCells}
      </div>
    );
  }
  return gridRows;
}