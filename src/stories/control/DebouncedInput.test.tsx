import { fireEvent, screen, waitFor, render } from "@testing-library/react";
import { DebouncedInput } from "stories/control/DebouncedInput";

describe("Debounced Input", () => {
  it("should fire event on blur", () => {
    const callback = jest.fn();
    render(<DebouncedInput onChangeEnd={callback} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.blur(input);

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("should fire event on enter", () => {
    const callback = jest.fn();
    render(<DebouncedInput onChangeEnd={callback} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("should fire event after user stops typing", async () => {
    const callback = jest.fn();
    render(<DebouncedInput onChangeEnd={callback} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(
      () => {
        expect(callback).toHaveBeenCalledWith("test");
      },
      { timeout: 1200 }
    );
  });
});
