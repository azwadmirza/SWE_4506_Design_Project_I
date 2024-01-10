export const parseTxt = async (file: File, delimiter: string): Promise<string[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        try {
          const fileData = event.target?.result as string;
          const rows = fileData.split('\n');
          const parsedData: string[][] = [];
  
          rows.forEach((row) => {
            const columns = row.split(delimiter);
            parsedData.push(columns);
          });
          resolve(parsedData);
        } catch (error) {
          reject("Error parsing text file: " + error);
        }
      };
  
      reader.onerror = (error) => {
        reject("Error reading file: " + (error.target as any).error.message);
      };
  
      reader.readAsText(file);
    });
  };
  