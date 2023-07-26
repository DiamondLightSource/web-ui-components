import { render, screen } from "@testing-library/react";
import { InfoGroup } from "stories/visualisation/InfoGroup";

describe("InfoGroup", () => {
  it('should display "?" when no value is present', () => {
    render(<InfoGroup info={[{ label: "title" }]} />);

    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("should display value when provided", () => {
    render(<InfoGroup info={[{ label: "title", value: "value" }]} />);

    expect(screen.getByText("value")).toBeInTheDocument();
  });

  it("shold render skeleton if there is no info", () => {
    render(<InfoGroup info={[]} />);

    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});
