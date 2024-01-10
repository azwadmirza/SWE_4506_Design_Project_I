function convertToCSV(array: any[]) {
  const header = array[0].join(',');
  const rows = array.slice(1).map(row => row.join(','));
  return `${header}\n${rows.join('\n')}`;
}

export default convertToCSV;
