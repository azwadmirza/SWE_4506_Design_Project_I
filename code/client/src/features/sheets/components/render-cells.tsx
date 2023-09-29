type GridProps={
  gridRows:JSX.Element[]|undefined;
}

const Grid = ({gridRows}:GridProps) => {

  return (
    <div className="grid-container">
      <div className="grid">
        {gridRows}
      </div>
    </div>
  );
}

export default Grid;
