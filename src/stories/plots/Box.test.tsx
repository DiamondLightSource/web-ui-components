import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BoxPlot } from "stories/plots/Box";

describe("Box Plot", () => {
  it("should render graph", () => {
    render(
      <BoxPlot
        data={[{ min: 1, max: 10, median: 5, q1: 3, q3: 6, label: "test" }]}
        width={100}
        height={100}
      />
    );
    expect(screen.getAllByText("test").length).toBe(2);
  });

  it("should render multiple boxes", () => {
    render(
      <BoxPlot
        data={[
          { min: 1, max: 10, median: 5, q1: 3, q3: 6, label: "test" },
          { min: 1, max: 10, median: 5, q1: 3, q3: 6, label: "test2" },
        ]}
        width={100}
        height={100}
      />
    );
    expect(screen.getAllByTestId("box-item").length).toBe(2);
  });

  it("should render axis labels", () => {
    render(
      <BoxPlot
        data={[{ min: 1, max: 10, median: 5, q1: 3, q3: 6, label: "test" }]}
        options={{ y: { label: "axis label" } }}
        width={100}
        height={100}
      />
    );
    expect(screen.getByText("axis label")).toBeInTheDocument();
  });

  it("should display tooltip when box is hovered", async () => {
    render(
      <BoxPlot
        data={[{ min: 1, max: 10, median: 5, q1: 3, q3: 6, label: "test" }]}
        width={100}
        height={100}
      />
    );
    const box = screen.getByLabelText("Box");
    fireEvent.mouseOver(box);

    await waitFor(() => expect(screen.getByLabelText("Box Title")).toHaveTextContent("test"));
  });

  it("should hide tooltip when mouse leaves box", async () => {
    render(
      <BoxPlot
        data={[{ min: 1, max: 10, median: 5, q1: 3, q3: 6, label: "test" }]}
        width={100}
        height={100}
      />
    );
    const box = screen.getByLabelText("Box");
    fireEvent.mouseOver(box);

    await waitFor(() => expect(screen.getByLabelText("Box Title")).toHaveTextContent("test"));

    fireEvent.mouseLeave(box);
    await waitFor(() => expect(screen.queryByLabelText("Box Title")).not.toBeInTheDocument());
  });

  it("should calculate domain when no domain is given", () => {
    render(
      <BoxPlot
        data={[
          { min: 3, max: 10, median: 5, q1: 3, q3: 6, label: "test" },
          { min: 1, max: 90, median: 5, q1: 3, q3: 6, label: "test2" },
        ]}
        width={100}
        height={100}
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getAllByText("100").length).toBe(2);
  });

  it("should use domain when provided", () => {
    render(
      <BoxPlot
        data={[
          { min: 3, max: 10, median: 5, q1: 3, q3: 6, label: "test" },
          { min: 1, max: 90, median: 5, q1: 3, q3: 6, label: "test2" },
        ]}
        options={{ y: { domain: { min: 0, max: 5 } } }}
        width={100}
        height={100}
      />
    );

    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getAllByText("5.0").length).toBe(2);
  });

  it("should not render outside domain boundaries", () => {
    render(
      <BoxPlot
        data={[{ min: 60, max: 90, median: 65, q1: 61, q3: 70, label: "test" }]}
        options={{ y: { domain: { min: 0, max: 5 } } }}
        width={100}
        height={100}
      />
    );

    expect(screen.queryByTestId("box-item")).not.toBeInTheDocument();
  });
});
