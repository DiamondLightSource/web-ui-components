import { fireEvent, render, screen } from "@testing-library/react";
import { Pagination } from "stories/navigation/Pagination";

describe("Pagination", () => {
  it("should display first 5 pages when there are more than 5 pages", () => {
    render(<Pagination total={90} />);
    for (let i = 1; i < 6; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }
  });

  it("should only display relevant pages when there are fewer than 5 pages", () => {
    render(<Pagination total={40} />);
    for (let i = 1; i < 3; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }

    expect(screen.queryByText("3")).toBeNull();
  });

  it("should display correct pages after increasing the amount of items per page", () => {
    render(<Pagination total={30} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: 15 } });

    for (let i = 1; i < 3; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }

    expect(screen.queryByText("3")).toBeNull();
  });

  it("should display correct pages after decreasing the amount of items per page", () => {
    render(<Pagination total={20} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: 10 } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: 5 } });

    for (let i = 1; i < 5; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }

    expect(screen.queryByRole("button", { name: "5" })).toBeNull();
  });

  it("should move page 'window' forward when moving to any page greater than 4", () => {
    render(<Pagination total={160} />);
    fireEvent.click(screen.getByRole("button", { name: "5" }));

    for (let i = 3; i < 8; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }

    expect(screen.queryByRole("button", { name: "8" })).toBeNull();
    expect(screen.queryByRole("button", { name: "2" })).toBeNull();
  });

  it("should display last 5 pages when moving to last page", () => {
    render(<Pagination total={160} />);
    fireEvent.click(screen.getByLabelText("Last Page"));

    for (let i = 4; i < 9; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }

    expect(screen.queryByRole("button", { name: "9" })).toBeNull();
    expect(screen.queryByRole("button", { name: "3" })).toBeNull();
  });

  it("should update page number when page changes", () => {
    render(<Pagination total={160} />);
    fireEvent.click(screen.getByLabelText("Next Page"));

    expect(screen.getByText("Page 2 out of 8")).toBeInTheDocument();
  });

  it("should disable all buttons when no pages are available", () => {
    render(<Pagination total={0} />);
    expect(screen.getByLabelText("Next Page")).toHaveAttribute("disabled");
    expect(screen.getByLabelText("Previous Page")).toHaveAttribute("disabled");
    expect(screen.getByLabelText("Last Page")).toHaveAttribute("disabled");
    expect(screen.getByLabelText("First Page")).toHaveAttribute("disabled");
  });

  it("should not display page count when no pages are available", () => {
    render(<Pagination total={0} />);
    expect(screen.queryByText("Page 1 out of 0")).not.toBeInTheDocument();
  });

  it("should use passed value instead of internal page mechanics if value is passed", () => {
    render(<Pagination total={200} page={3} />);
    expect(screen.getByText("Page 3 out of 10")).toBeInTheDocument();
  });

  it("should update page amount when items per page changes", () => {
    render(<Pagination total={160} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: 10 } });

    expect(screen.getByText("Page 2 out of 16")).toBeInTheDocument();
  });

  it("should call callback when page changes", () => {
    const mockCallback = jest.fn();
    render(<Pagination total={160} onPageChange={mockCallback} />);

    const input = screen.getByLabelText("Next Page");
    fireEvent.click(input);

    expect(mockCallback).toHaveBeenCalledWith(2);
  });

  it("should call items per page changes", () => {
    const mockCallback = jest.fn();
    render(<Pagination total={160} onItemCountChange={mockCallback} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: 5 } });

    expect(mockCallback).toHaveBeenCalledWith(5);
  });

  it("should limit item count to prop-passed value", () => {
    const mockCallback = jest.fn();
    render(<Pagination total={160} limit={30} onItemCountChange={mockCallback} />);
    expect(screen.getByRole("combobox")).toHaveValue("30");
  });

  it("should default to option in the middle if item limit is not in dropdown", () => {
    const mockCallback = jest.fn();
    render(<Pagination total={160} limit={920} onItemCountChange={mockCallback} />);
    expect(screen.getByRole("combobox")).toHaveValue("20");
  });

  it("should reset page when page count changes if current page is greater than page count", () => {
    const mockCallback = jest.fn();
    const { rerender } = render(<Pagination total={160} onPageChange={mockCallback} />);

    const input = screen.getByLabelText("Next Page");
    fireEvent.click(input);

    expect(mockCallback).toHaveBeenCalledWith(2);

    rerender(<Pagination total={20} onPageChange={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledWith(1);
  });

  it("should not call page callback if externally controlled page changes", () => {
    const mockCallback = jest.fn();
    const { rerender } = render(<Pagination total={100} page={1} onPageChange={mockCallback} />);
    rerender(<Pagination total={100} page={2} onPageChange={mockCallback} />);

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
