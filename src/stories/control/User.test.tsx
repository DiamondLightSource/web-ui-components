import { fireEvent, screen, render } from "@testing-library/react";
import { User } from "stories/control/User";

describe("User", () => {
  it("should display login button when not authenticated", () => {
    render(<User onLogin={() => {}} onLogout={() => {}} user={null} />);
    const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();
  });

  it("should display logout button when authenticated", () => {
    render(<User onLogin={() => {}} onLogout={() => {}} user={{ name: "Name", fedid: "FedID" }} />);
    const logoutButton = screen.getByText("Logout");

    expect(logoutButton).toBeInTheDocument();
  });

  it("should fire login callback when button is clicked", () => {
    const loginCallback = jest.fn();
    render(<User onLogin={loginCallback} onLogout={() => {}} user={null} />);
    const loginButton = screen.getByText("Login");

    fireEvent.click(loginButton);

    expect(loginCallback).toHaveBeenCalled();
  });

  it("should fire logout callback when button is clicked", () => {
    const logoutCallback = jest.fn();
    render(
      <User onLogin={() => {}} onLogout={logoutCallback} user={{ name: "Name", fedid: "FedID" }} />,
    );
    const logoutButton = screen.getByText("Logout");

    fireEvent.click(logoutButton);

    expect(logoutCallback).toHaveBeenCalled();
  });

  it("should display name and FedID", () => {
    render(<User onLogin={() => {}} onLogout={() => {}} user={{ name: "Name", fedid: "FedID" }} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("FedID")).toBeInTheDocument();
  });
});
