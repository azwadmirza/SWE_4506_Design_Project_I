import * as XLSX from 'xlsx';


export const parseXLSX = async (file:File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        resolve(jsonData);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsBinaryString(file);
    });
  };