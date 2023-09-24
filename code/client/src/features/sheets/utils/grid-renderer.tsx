import Cell from "../components/cell";

export function renderGrid(){
    const numRows = 200;
    const numCols = 200;

  const gridRows = [];
  const gridCells = [<Cell Key={`Index\\Columns`} type="row-header" />];


  for (let col = 0; col < numCols; col++) {
    gridCells.push(<Cell type="column-header" Key={`${col+1}`} />);
  }


  gridRows.push(
    <div key={`column-header`} className="grid-row">
      {gridCells}
    </div>
  );

  for (let row = 0; row < numRows; row++) {
    const gridCells = [<Cell Key={`${row+1}`} type="row-header" />];


    for (let col = 0; col < numCols; col++) {
      gridCells.push(<Cell  Key={``} type="cell"/>);
    }


    gridRows.push(
      <div key={`row-${row}`} className="grid-row">
        {gridCells}
      </div>
    );
  }

  return gridRows;
}