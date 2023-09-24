type GridProps={
  gridRows:JSX.Element[];
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
