export const createJsonData = async (gridRows: JSX.Element[]): any[][] => {
    const jsonData: any[][] = [];
  
    for (const rowElement of gridRows) {
      const row: any[] = [];
  
      const cellElements = rowElement.props.children as JSX.Element[];
      for (const cellElement of cellElements) {
        const key = cellElement.props.Key;
        const value = cellElement.props.type === "cell" ? cellElement.props.Value : null;
  
        row.push({ [key]: value });
      }
      jsonData.push(row);
    }
  
    return jsonData;
  };
  