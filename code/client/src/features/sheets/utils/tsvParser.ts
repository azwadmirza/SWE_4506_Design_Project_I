import Papa from "papaparse";

export const parseTSV = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      delimiter: "\t", 
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
};
