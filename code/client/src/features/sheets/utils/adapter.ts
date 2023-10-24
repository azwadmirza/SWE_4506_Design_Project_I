export const fileAdapter= async(file: File,parser:(file: File) => Promise<any[]>): Promise<any[]>=>{
    const parse=await parser(file);
    const parsedData:any[]=[];
    const headers=Object.keys(parse[0]);
    parsedData.push(headers);
    parse.forEach((row)=>{
        const parsedRow:any[]=[];
        const headers=Object.keys(row);
        headers.forEach((header)=>{
            parsedRow.push(row[header]);
        });
        parsedData.push(parsedRow);
    });
    return parsedData;
}