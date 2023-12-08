import { screen, render } from "@testing-library/react";
import { TwoLineLink } from "./TwoLineLink";

describe("Two Line Link", () => {
  it("should render title and description", () => {
    render(
      <TwoLineLink title='Link Title' href='https://diamond.ac.uk'>
        Link Description
      </TwoLineLink>,
    );

    expect(screen.getByText(/link description/i)).toBeInTheDocument();
    expect(screen.getByText(/link title/i)).toBeInTheDocument();
  });

  it("should point to passed destination", () => {
    render(
      <TwoLineLink title='Link Title' href='https://diamond.ac.uk'>
        Link Description
      </TwoLineLink>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("href", "https://diamond.ac.uk");
  });

  it("should have aria-disabled accessibility attribute set if disabled", () => {
    render(
      <TwoLineLink title='Link Title' href='https://diamond.ac.uk' isDisabled={true}>
        Link Description
      </TwoLineLink>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("aria-disabled", "true");
  });
});
