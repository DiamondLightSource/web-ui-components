import { fireEvent, render, screen } from "@testing-library/react";
import { BarChart } from "stories/plots/Bar";

describe("Box Plot", () => {
  it("should render bar", () => {
    render(
      <BarChart
        data={[
          [
            { y: 90, label: "bar" },
            { y: 910, label: "test" },
            { y: 290, label: "again" },
          ],
        ]}
      />
    );
    expect(screen.getByTestId("0-bar")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
  });

  it("should render multiple bar groups", () => {
    render(
      <BarChart
        data={[
          [
            { y: 90, label: "bar" },
            { y: 910, label: "test" },
            { y: 290, label: "again" },
          ],
          [
            { y: 90, label: "bar" },
            { y: 910, label: "test" },
            { y: 290, label: "again" },
          ],
        ]}
      />
    );
    expect(screen.getByTestId("0-bar")).toBeInTheDocument();
    expect(screen.getAllByText("bar").length).toBe(2);
  });

  it("should display tooltip when hovered", () => {
    render(
      <BarChart
        data={[
          [
            { y: 90, label: "bar" },
            { y: 910, label: "test" },
            { y: 290, label: "again" },
          ],
        ]}
      />
    );
    fireEvent.mouseOver(screen.getByTestId("0-bar"));

    expect(screen.getByLabelText("Y Value")).toHaveTextContent(/value: 90/i);
  });

  it("should hide tooltip when mouse leaves bar", () => {
    render(
      <BarChart
        data={[
          [
            { y: 90, label: "bar" },
            { y: 910, label: "test" },
            { y: 290, label: "again" },
          ],
        ]}
      />
    );
    const bar = screen.getByTestId("0-bar");
    fireEvent.mouseOver(bar);

    expect(screen.getByLabelText("Y Value")).toHaveTextContent(/value: 90/i);

    fireEvent.mouseLeave(bar);

    expect(screen.queryByLabelText("Y Value")).not.toBeInTheDocument();
  });

  it("should clamp bars at user set domain", () => {
    render(
      <BarChart
        data={[
          [
            { y: 90, label: "bar" },
            { y: 910, label: "test" },
            { y: 290, label: "again" },
          ],
        ]}
        options={{ y: { domain: { min: 0, max: 50 } } }}
      />
    );
    expect(screen.getByTestId("0-test")).toHaveAttribute("height", "50");
  });
});
