import { fireEvent, screen, render } from "@testing-library/react";
import { Navbar } from "stories/navigation/Navbar";

describe("Navbar", () => {
  it("should display hamburger menu on narrow displays", () => {
    global.innerWidth = 600;
    render(<Navbar links={[{ route: "/", label: "Proposals" }]} />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("should display menu items when hamburger menu is clicked", () => {
    global.innerWidth = 600;
    render(<Navbar links={[{ route: "/", label: "Proposals" }]} />);
    const menu = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menu);

    expect(screen.getAllByText("Proposals")).toHaveLength(2);
  });

  it("should render links properly", () => {
    global.innerWidth = 600;
    render(<Navbar links={[{ route: "/", label: "Proposals" }]} />);
    expect(screen.getByText("Proposals")).toBeInTheDocument();
  });

  it("should not display logo by default", () => {
    global.innerWidth = 600;
    render(<Navbar links={[{ route: "/", label: "Proposals" }]} />);
    expect(screen.getByAltText("Home")).toBeInTheDocument();
  });

  it("should not display logo if null", () => {
    global.innerWidth = 600;
    render(<Navbar logo={null} links={[{ route: "/", label: "Proposals" }]} />);
    expect(screen.queryByAltText("Home")).not.toBeInTheDocument();
  });
});
