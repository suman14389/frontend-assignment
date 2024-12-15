import React from "react";
import "../Styles/Table.css";

const Table = ({ children }) => {
  return <div className="table">{children}</div>;
};

Table.Head = ({ children }) => {
  return <div className="table-head">{children}</div>;
};

Table.Body = ({ children }) => {
  return <div className="table-body">{children}</div>;
};

Table.Row = ({ children, isHeader }) => {
  return (
    <div className={`table-row ${isHeader ? "table-head-row" : ""}`}>
      {children}
    </div>
  );
};

Table.Cell = ({ children, isHeader }) => {
  return (
    <div className={`table-cell ${isHeader ? "header-cell" : ""}`}>
      {children}
    </div>
  );
};

export default Table;
