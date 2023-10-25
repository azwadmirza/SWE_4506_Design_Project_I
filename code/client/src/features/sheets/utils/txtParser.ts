export const parseTxt = async (file: File, delimiter: string): Promise<string[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        try {
          const fileData = event.target?.result as string;
          // Split the file data into an array of rows using a line break
          const rows = fileData.split('\n');
  
          // Initialize an array to store the parsed data
          const parsedData: string[][] = [];
  
          rows.forEach((row) => {
            // Split each row into an array using the specified delimiter
            const columns = row.split(delimiter);
            parsedData.push(columns);
          });
  
          // Resolve the promise with the parsed data
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
  