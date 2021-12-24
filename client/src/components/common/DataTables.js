import React from "react";
import moment from "moment";

const DataTables = ({ data, headers, mainTab, secondaryTab }) => {
  if (!mainTab && !secondaryTab) {
    const columns = data[0] && Object.keys(data[0]);

    return (
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {headers.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column, index) =>
                column == "createdAt" ? (
                  <td key={index + 20}>
                    {moment(row[column]).format("DD/MM/YYYY")}
                  </td>
                ) : (
                  <td key={index + 20}>{row[column]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  const columns = data[0][mainTab] && Object.keys(data[0][mainTab]);
  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
          {headers.map((heading) => (
            <th>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <>
            <tr key={row[mainTab]["id"]}>
              {columns.map((column) =>
                column == "createdAt" ? (
                  <td>{moment(row[mainTab][column]).format("DD/MM/YYYY")}</td>
                ) : (
                  <td>{row[mainTab][column]}</td>
                )
              )}
              {secondaryTab ? <td>{row[secondaryTab].length}</td> : <> </>}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default DataTables;
