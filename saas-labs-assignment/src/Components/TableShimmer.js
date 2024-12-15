import React from "react";
import "../Styles/Table.css";
import Table from "./Table";

const TableShimmer = ({ numberOfRows }) => {
  return (
    <div className="table-shimmer">
      {[...Array(numberOfRows)].map((_, index) => (
        <Table.Row key={`shimmer-loading-${index}`}>
          <Table.Cell className="shimmer-loading-cell full-width">
            <div className="shimmer-loading"></div>
          </Table.Cell>
          <Table.Cell className="shimmer-loading-cell full-width">
            <div className="shimmer-loading"></div>
          </Table.Cell>
          <Table.Cell className="shimmer-loading-cell full-width">
            <div className="shimmer-loading"></div>
          </Table.Cell>
        </Table.Row>
      ))}
    </div>
  );
};

export default TableShimmer;
