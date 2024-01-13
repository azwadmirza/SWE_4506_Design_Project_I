export async function arrayToCSV(data: any[][], delimiter: string = ',',filename:string,mimeType:string): Promise<File> {
  const csvContent = data.map(e => e.join(delimiter)).join('\n');
  console.log(csvContent);
  const blob = new Blob([csvContent], { type: mimeType });
  const file = new File([blob], filename, { type: mimeType });
  return file;
}