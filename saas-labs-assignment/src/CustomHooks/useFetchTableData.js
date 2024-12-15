import { useState, useEffect } from "react";

const useFetchTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetch(
      " https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setIsDataLoading(false);
        setTableData(data);
      });
  }, []);

  return [isDataLoading, tableData];
};

export default useFetchTableData;
