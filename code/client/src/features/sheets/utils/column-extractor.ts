export function getColumnValues(matrix: any[][], columnIndex: number): any[] {
    const columnValues: any[] = [];

    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i].length > columnIndex) {
            columnValues.push(matrix[i][columnIndex]);
        } else {
            console.error(`Column index ${columnIndex} is out of bounds for row ${i}`);
        }
    }

    return columnValues;
}