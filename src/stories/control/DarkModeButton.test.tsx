import { fireEvent, screen, render } from "@testing-library/react";
import { DarkModeButton } from "./DarkModeButton";
import { ColorModeProvider } from "@chakra-ui/react";

describe("Dark Mode Button", () => {
  it("it should use light mode by default", () => {
    render(<DarkModeButton />);
    screen.getByLabelText("Light Mode");
  });

  it("it should update label if button clicked", async () => {
    render(
      <ColorModeProvider>
        <DarkModeButton />
      </ColorModeProvider>,
    );
    fireEvent.click(screen.getByRole("button"));
    await screen.findByLabelText("Dark Mode");
  });
});
