import { fileAdapter } from "../features/sheets/utils/adapter";
import { parseCSV } from "../features/sheets/utils/csvParser";
import { parseJSON } from "../features/sheets/utils/jsonParser";
import { parseTxt } from "../features/sheets/utils/txtParser";
import { parseXLSX } from "../features/sheets/utils/xlsxParser";

export const parseFile = async (file: File,delimiter:string|null,type:string|null) => {
    if(type===null){
        console.log("File Type Unknown");
        return [];
    }
    if (type === "text/csv") {
      const parsedCSV = await parseCSV(file);
      return parsedCSV;
    } else if (type === "text/plain") {
      const parsedTxt = await parseTxt(file, delimiter?delimiter:"");
      return parsedTxt;
    } else if (
      type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const parsedXLSX = await fileAdapter(file, parseXLSX);
      return parsedXLSX;
    } else if (type === "application/json") {
      const parsedJSON = await fileAdapter(file, parseJSON);
      return parsedJSON;
    } else {
      return null;
    }
  };