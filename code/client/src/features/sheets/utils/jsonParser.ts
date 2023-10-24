export const parseJSON = async(file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        resolve(jsonData);
      } catch (error) {
        reject("Error parsing JSON file: ");
      }
    };

    reader.onerror = (error) => {
      reject("Error reading file: " + (error.target as any).error.message);
    };

    reader.readAsText(file);
  });
};
