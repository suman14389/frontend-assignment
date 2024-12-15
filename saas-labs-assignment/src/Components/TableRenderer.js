import React from "react";
import Table from "./Table";
import TableShimmer from "./TableShimmer";

const TableRenderer = ({ isLoading, tableData }) => {
  return (
    <div className="table-container">
      <Table>
        <Table.Head>
          <Table.Row isHeader>
            <Table.Cell isHeader>S.No.</Table.Cell>
            <Table.Cell isHeader>Percentage funded</Table.Cell>
            <Table.Cell isHeader>Amount pledged</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {isLoading ? (
            <TableShimmer numberOfRows={5} />
          ) : (
            tableData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row["s.no"] + 1}</Table.Cell>
                <Table.Cell>{row["percentage.funded"]}</Table.Cell>
                <Table.Cell>{row["amt.pledged"]}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableRenderer;
