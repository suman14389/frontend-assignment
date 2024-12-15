// TableRenderer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Add this import
import TableRenderer from "../Components/TableRenderer";

describe("TableRenderer Component", () => {
  const mockTableData = [
    {
      id: 1,
      "s.no": 0,
      "percentage.funded": "75%",
      "amt.pledged": "$1000",
    },
    {
      id: 2,
      "s.no": 1,
      "percentage.funded": "50%",
      "amt.pledged": "$500",
    },
  ];

  it("renders table headers correctly", () => {
    render(<TableRenderer isLoading={false} tableData={[]} />);

    // Use getByText and add role to header cells in your component
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage funded")).toBeInTheDocument();
    expect(screen.getByText("Amount pledged")).toBeInTheDocument();
  });

  it("renders TableShimmer when loading", () => {
    render(<TableRenderer isLoading={true} tableData={[]} />);

    // Instead of using test-id, look for shimmer elements by class
    const shimmerElements = document.getElementsByClassName("shimmer-loading");
    expect(shimmerElements.length).toBe(15); // 5 rows * 3 cells
  });

  it("renders table data correctly when not loading", () => {
    render(<TableRenderer isLoading={false} tableData={mockTableData} />);

    // Check if data is rendered correctly
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  it("renders empty table when tableData is empty and not loading", () => {
    render(<TableRenderer isLoading={false} tableData={[]} />);

    // Look for cells by class name instead of role
    const cells = document.getElementsByClassName("table-cell");
    expect(cells.length).toBe(3); // Only header cells
  });

  it("renders correct number of rows based on tableData", () => {
    render(<TableRenderer isLoading={false} tableData={mockTableData} />);

    // Look for rows by class name instead of role
    const rows = document.getElementsByClassName("table-row");
    // 1 header row + 2 data rows
    expect(rows.length).toBe(3);
  });
});
