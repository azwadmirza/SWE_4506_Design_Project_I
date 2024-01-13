import {useTable} from "react-table";
interface IStatTable {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: any[];
}
const StatTable = ({ columns, data }: IStatTable) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="mt-5">
      <h3 className="mb-2">Statistical Distribution of Data</h3>
      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup:any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column:any) => (
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
          {rows.map((row:any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                {row.cells.map((cell:any) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {typeof cell.value === "object" ? (
                      // Render nested object properties
                      <>
                        {cell.value && (
                          <>
                            <div>Count: {cell.value.count}</div>
                            <div>Mean: {cell.value.mean}</div>
                            <div>Min: {cell.value.min}</div>
                            <div>25%: {cell.value["25%"]}</div>
                            <div>50%: {cell.value["50%"]}</div>
                            <div>75%: {cell.value["75%"]}</div>
                            <div>Max: {cell.value.max}</div>
                            <div>Std: {cell.value.std}</div>
                          </>
                        )}
                      </>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatTable;