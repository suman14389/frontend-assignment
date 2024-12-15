import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginatedButtons from "../Components/PaginatedButtons";

describe("PaginatedButtons", () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it("should disable previous button when startPage is 1", () => {
    render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const previousButton = document.getElementById("previous-btn");
    expect(previousButton).toHaveAttribute("disabled");
  });

  it("should disable next button when on last set of pages", () => {
    render(
      <PaginatedButtons
        numberOfPages={3}
        currentPage={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const nextButton = document.getElementById("next-btn");
    expect(nextButton).toHaveAttribute("disabled");
  });

  it("should show correct number of page buttons", () => {
    render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const pageButtons = screen
      .getAllByRole("button")
      .filter((button) => !["Previous", "Next"].includes(button.textContent));
    expect(pageButtons).toHaveLength(3); // VISIBLE_PAGES is 3
  });

  it("should highlight current page button", () => {
    render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={2}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const currentPageButton = screen.getByText("2");
    expect(currentPageButton).toHaveClass("active-page");
  });

  it("should call setCurrentPage when a page button is clicked", () => {
    render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("should update visible pages when next button is clicked", () => {
    render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const nextButton = document.getElementById("next-btn");
    fireEvent.click(nextButton);

    // After clicking next, we should see page 2 as the first visible page
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should update visible pages when previous button is clicked", () => {
    const { rerender } = render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    // First, move to a position where previous button is enabled
    rerender(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={4}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const previousButton = document.getElementById("previous-btn");
    fireEvent.click(previousButton);

    // After clicking previous, we should see the previous set of pages
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should display current page number correctly", () => {
    render(
      <PaginatedButtons
        numberOfPages={5}
        currentPage={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getByText("Current Page: 3")).toBeInTheDocument();
  });
});
