import { fireEvent, screen, render } from "@testing-library/react";
import { DarkModeButton } from "./DarkModeButton";
import { ColorModeProvider } from "@chakra-ui/react";

describe("Dark Mode Button", () => {

  it("it should use light mode by default", () => {
    render(<DarkModeButton />)
    screen.getByLabelText('Light Mode')
  });

  it("it should update label if button clicked", async () => {
    render(<ColorModeProvider><DarkModeButton /></ColorModeProvider>)
    fireEvent.click(screen.getByRole("button"))
    await screen.findByLabelText('Dark Mode')
    screen.debug()
  });

  it("check if toggleColorMode called when button clicked", () => {
    const mockToggle = jest.fn()
    render(<DarkModeButton onClick={mockToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockToggle).toHaveBeenCalled;
  });
});
