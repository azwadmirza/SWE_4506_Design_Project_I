import { useTable } from "react-table";
interface IDataTable {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: any[];
}
const DataTable = ({ columns, data }: IDataTable) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="mt-5">
      <h3 className="mb-2">Data Types of Fields</h3>
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
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
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
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {" "}
                    {cell.render("Cell")}
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

export default DataTable;
