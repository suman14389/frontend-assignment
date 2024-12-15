import TableRenderer from "./Components/TableRenderer";
import PaginatedButtons from "./Components/PaginatedButtons";
import useFetchTableData from "./CustomHooks/useFetchTableData";
import { useState } from "react";
import "./Styles/App.css";

function App() {
  const [isLoading, tableData] = useFetchTableData();

  const numberOfPages = Math.ceil(tableData.length / 5);
  const [currentPage, setCurrentPage] = useState(1);

  let currentPageData = [];

  if (!isLoading) {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    currentPageData = tableData.slice(startIndex, endIndex);
  }

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <TableRenderer isLoading={isLoading} tableData={currentPageData} />
      <PaginatedButtons
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={handleCurrentPage}
      />
    </div>
  );
}

export default App;
