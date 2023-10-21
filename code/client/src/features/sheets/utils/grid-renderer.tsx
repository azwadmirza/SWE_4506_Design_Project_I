import Cell from "../components/cell";

export function renderGrid(setCurrentCell:React.Dispatch<React.SetStateAction<string>>,setViewValue:React.Dispatch<React.SetStateAction<string>>){
    const numRows = 200;
    const numCols = 200;

  const gridRows = [];
  const gridCells = [<Cell Key={`Index\\Columns`} type="row-header index" setterCell={setCurrentCell} setViewValue={setViewValue}/>];


  for (let col = 0; col < numCols; col++) {
    gridCells.push(<Cell type="column-header" Key={`column-header ${col+1}`}  setterCell={setCurrentCell} setViewValue={setViewValue}/>);
  }


  gridRows.push(
    <div key={`row-${0}`} className="grid-row">
      {gridCells}
    </div>
  );

  for (let row = 1; row <= numRows; row++) {
    const gridCells = [<Cell Key={`row-header ${row}`} type="row-header"  setterCell={setCurrentCell} setViewValue={setViewValue}/>];


    for (let col = 0; col < numCols; col++) {
      gridCells.push(<Cell  Key={`${row}:${col+1}`} type="cell"  setterCell={setCurrentCell} setViewValue={setViewValue}/>);
    }


    gridRows.push(
      <div key={`row-${row}`} className="grid-row">
        {gridCells}
      </div>
    );
  }

  return gridRows;
}