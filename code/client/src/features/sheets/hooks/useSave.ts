import { createJsonData } from "../utils/save-data";

export const useSave = () => {
    const save = (gridRows: JSX.Element[]) => {
      const jsonData = createJsonData(gridRows);
      console.log(jsonData);
    };
  
    return { save };
  };