export const createJsonData = (gridRows: JSX.Element[]): any[][] => {
    let jsonData: any[][] = [];
  
    for (const rowElement of gridRows) {
      const row: any[] = [];
      const cellElements = rowElement.props.children as JSX.Element[];
      for (const cellElement of cellElements) {
  
        row.push(cellElement.props.Value);
      }
      jsonData.push(row);
    }
    jsonData = jsonData.map(row => row.slice(1));
  
    return jsonData;
  };
  