import { useTable } from "react-table";
interface IStatTable{
    columns:{
        Header: string;
        accessor: string;
    }[];
    data:any[];
}
const StatTable = ({columns,data}:IStatTable) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
    return ( 
        <table
          {...getTableProps()}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      background: "#f2f2f2",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      {typeof cell.value === "object" ? (
                        // Render nested object properties
                        <>
                          {cell.value && (<>
                            <div>Count: {cell.value.count}</div>
                          <div>Mean: {cell.value.mean}</div>
                          <div>Min: {cell.value.min}</div>
                          <div>25%: {cell.value["25%"]}</div>
                          <div>50%: {cell.value["50%"]}</div>
                          <div>75%: {cell.value["75%"]}</div>
                          <div>Max: {cell.value.max}</div>
                          <div>Std: {cell.value.std}</div>
                          </>)}
                        </>
                      ) : (
                        // Render non-object values
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
     );
}
 
export default StatTable;