import { renderHook } from "@testing-library/react-hooks";
import useFetchTableData from "../CustomHooks/useFetchTableData";

describe("useFetchTableData", () => {
  const mockData = [
    { id: 1, name: "Test 1" },
    { id: 2, name: "Test 2" },
  ];

  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch and return data successfully", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchTableData());

    // Initial state
    expect(result.current[0]).toBe(true); // isDataLoading
    expect(result.current[1]).toEqual([]); // tableData

    // Wait for the fetch to complete
    await waitForNextUpdate();

    // After fetch completion
    expect(result.current[0]).toBe(false); // isDataLoading
    expect(result.current[1]).toEqual(mockData); // tableData
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      " https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });
});
