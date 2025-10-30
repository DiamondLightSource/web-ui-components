import { Flipper } from "stories/navigation/Flipper";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Flipper", () => {
  it("should display item count properly", () => {
    render(<Flipper total={112} />);

    expect(screen.getByText("112")).toBeInTheDocument();
  });

  it("should set last item as default", () => {
    render(<Flipper total={112} />);

    expect(screen.getByDisplayValue("112")).toBeInTheDocument();
  });

  it("should respect default item set by user", () => {
    render(<Flipper defaultPage={90} total={112} />);

    expect(screen.getByDisplayValue("90")).toBeInTheDocument();
  });

  it("should respect page item set by user", () => {
    render(<Flipper page={90} total={112} />);

    expect(screen.getByDisplayValue("90")).toBeInTheDocument();
  });

  it("should let page take precedence over default page", () => {
    render(<Flipper page={90} defaultPage={10} total={112} />);

    expect(screen.getByDisplayValue("90")).toBeInTheDocument();
  });

  it("should not display default if default is an invalid page number", () => {
    render(<Flipper defaultPage={-1} total={112} />);

    expect(screen.queryByDisplayValue("-1")).not.toBeInTheDocument();
  });

  it("should not display page if page is an invalid page number", () => {
    render(<Flipper page={-1} total={112} />);

    expect(screen.queryByDisplayValue("-1")).not.toBeInTheDocument();
  });

  it("should update page if default page changes even if page is set", async () => {
    const { rerender } = render(<Flipper defaultPage={10} total={112} />);
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();

    rerender(<Flipper defaultPage={50} total={112} />);
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
  });

  it("should set middle item as default if startFrom is middle", () => {
    render(<Flipper startFrom='middle' total={90} />);

    expect(screen.getByDisplayValue("45")).toBeInTheDocument();
  });

  it("should set first item as default if startFrom is start", () => {
    render(<Flipper startFrom='start' total={90} />);

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("should not allow item greater than the item count to be set", () => {
    render(<Flipper total={112} />);

    const input = screen.getByDisplayValue("112");

    fireEvent.change(input, { target: { value: 200 } });
    fireEvent.blur(input);

    expect(screen.getByDisplayValue("112")).toBeInTheDocument();
  });

  it("should not allow item inferior to the item count to be set", () => {
    render(<Flipper total={112} />);

    const input = screen.getByDisplayValue("112");

    fireEvent.change(input, { target: { value: 0 } });
    fireEvent.blur(input);

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("should allow any valid page to be set", () => {
    render(<Flipper total={112} />);

    const input = screen.getByDisplayValue("112");

    fireEvent.change(input, { target: { value: 20 } });
    fireEvent.blur(input);

    expect(screen.getByDisplayValue("20")).toBeInTheDocument();
  });

  it("should call callback when page changes", () => {
    const mockCallback = jest.fn();
    render(<Flipper total={112} onChange={mockCallback} />);

    const input = screen.getByLabelText("Previous Page");
    fireEvent.click(input);

    expect(mockCallback).toHaveBeenCalledWith(111);
  });

  it("should call callback when page changes (debounced)", async () => {
    const mockCallback = jest.fn();
    render(<Flipper total={112} onChangeEnd={mockCallback} />);

    const input = screen.getByLabelText("Previous Page");
    fireEvent.click(input);

    await waitFor(() => expect(mockCallback).toHaveBeenCalledWith(111));
  });

  it("should not change page if page is controlled externally", () => {
    const mockCallback = jest.fn();
    render(<Flipper total={112} page={112} onChange={mockCallback} />);

    const input = screen.getByLabelText("Previous Page");
    fireEvent.click(input);

    expect(mockCallback).toHaveBeenCalledWith(111);
    expect(screen.getByLabelText("Current Page")).not.toHaveAttribute("value", "111");
  });
});
