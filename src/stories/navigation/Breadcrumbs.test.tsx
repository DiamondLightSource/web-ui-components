import { screen, render } from "@testing-library/react";
import { Breadcrumbs } from "stories/navigation/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("should display path", () => {
    render(<Breadcrumbs path='/foo/1/bar/2' />);
    expect(screen.getAllByText(">")).toHaveLength(4);
  });

  it("should assign correct href paths", () => {
    render(<Breadcrumbs path='/foo/1/bar/2' />);
    expect(screen.getByText("bar")).toHaveAttribute("href", "/foo/1/bar");
  });

  it("should not be rendered if there is no path", () => {
    render(<Breadcrumbs path='' />);
    expect(screen.queryByLabelText("Home")).not.toBeInTheDocument();
  });
});
