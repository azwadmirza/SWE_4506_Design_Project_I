export async function arrayToCSV(data: any[][], delimiter: string = ',',filename:string,mimeType:string): Promise<File> {
  const csvContent = data.map(e => e.join(delimiter)).join('\n');
  console.log(csvContent);
  const blob = new Blob([csvContent], { type: mimeType });
  const file = new File([blob], filename, { type: mimeType });
  return file;
}

export async function fileToCSV(csvContent:string,filename:string,mimeType:string): Promise<File> {
  const blob = new Blob([csvContent], { type: mimeType });
  const file = new File([blob], filename, { type: mimeType });
  return file;
}

export async function convertToCSV(data: any[]|null){
  if(data==null){
    return;
  }
  return data.map(e => e.join(',')).join('\n');
}