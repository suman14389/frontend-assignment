import { useState, useEffect } from "react";
import { TABLE_API_URL } from "../Constants";

const useFetchTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetch(TABLE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setIsDataLoading(false);
        setTableData(data);
      });
  }, []);

  return [isDataLoading, tableData];
};

export default useFetchTableData;
