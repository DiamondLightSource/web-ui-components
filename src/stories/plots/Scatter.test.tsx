import { fireEvent, screen, waitFor, render } from "@testing-library/react";
import { ScatterPlot } from "stories/plots/Scatter";

describe("Scatter Plot", () => {
  it("should render graph", () => {
    render(<ScatterPlot data={[{ x: 1, y: 1 }]} width={100} height={100} />);
    expect(screen.getByTestId("dot")).toBeInTheDocument();
  });

  it("should render graph with multiple points", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ]}
        width={100}
        height={100}
      />,
    );
    expect(screen.getAllByTestId("dot").length).toBe(2);
  });

  it("should render axis labels", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ]}
        options={{ x: { label: "test" } }}
        width={100}
        height={100}
      />,
    );
    expect(screen.getAllByText("test").length).toBe(2);
  });

  it("should display tooltip when datapoint is hovered", async () => {
    render(<ScatterPlot data={[{ x: 522, y: 999 }]} width={100} height={100} />);
    fireEvent.mouseMove(screen.getByLabelText("Graph"), { clientX: 65, clientY: 35 });

    await waitFor(() => expect(screen.getByLabelText("X")).toHaveTextContent("x: 522"));
  });

  it("should hide tooltip after mouse leaves the Voronoi bounds for point", async () => {
    render(<ScatterPlot data={[{ x: 522, y: 999 }]} width={100} height={100} />);
    const graph = screen.getByLabelText("Graph");

    fireEvent.mouseMove(graph, { clientX: 65, clientY: 35 });

    await waitFor(() => {
      expect(screen.getByLabelText("X")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(graph);

    await waitFor(() => expect(screen.queryByLabelText("X")).not.toBeInTheDocument(), {
      timeout: 3000,
    });
  });

  it("should use X axis provided by the configuration", () => {
    render(
      <ScatterPlot
        data={[{ x: 522, y: 999 }]}
        options={{ x: { domain: { min: 0, max: 20 } } }}
        width={1000}
        height={1000}
      />,
    );

    expect(screen.getAllByText("20").length).toBe(2);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should use Y axis provided by the configuration", () => {
    render(
      <ScatterPlot
        data={[{ x: 522, y: 999 }]}
        options={{ y: { domain: { min: 0, max: 20 } } }}
        width={1000}
        height={1000}
      />,
    );

    expect(screen.getAllByText("20").length).toBe(2);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should not render outside domain boundaries", () => {
    render(
      <ScatterPlot
        data={[{ x: 522, y: 999 }]}
        options={{ x: { domain: { min: 0, max: 20 } } }}
        width={1000}
        height={1000}
      />,
    );

    expect(screen.queryByTestId("dot")).not.toBeInTheDocument();
  });

  it("should fire event when point is clicked", () => {
    const callback = jest.fn();
    render(
      <ScatterPlot
        data={[{ x: 522, y: 999 }]}
        width={100}
        height={100}
        onPointClicked={callback}
      />,
    );

    const graph = screen.getByLabelText("Graph");
    fireEvent.click(graph, { clientX: 65, clientY: 35 });

    expect(callback).toBeCalledWith(522, 999);
  });

  it("should decimate (nearly) overlapping points", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 999 },
          { x: 2, y: 998 },
          { x: 3, y: 800 },
          { x: 100, y: 800 },
        ]}
        width={4}
        height={4}
        options={{ points: { dotRadius: 0.3 } }}
        decimationThreshold={0.1}
      />,
    );

    expect(screen.getAllByTestId("dot").length).toBe(3);
  });

  it("should not decimate sufficiently distant (on Y axis) points", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 999 },
          { x: 2, y: 500 },
        ]}
        options={{ y: { domain: { min: 50, max: 1000 } }, points: { dotRadius: 0.3 } }}
        width={2}
        height={2}
        decimationThreshold={0.1}
      />,
    );

    expect(screen.getAllByTestId("dot").length).toBe(2);
  });

  it("should not decimate sufficiently distant (on X axis) points", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 999 },
          { x: 100, y: 999 },
        ]}
        options={{ y: { domain: { min: 990, max: 1000 } }, points: { dotRadius: 0.3 } }}
        width={1000}
        height={1000}
        decimationThreshold={0.1}
      />,
    );

    expect(screen.getAllByTestId("dot").length).toBe(2);
  });

  it("should not run decimation if there are not enough points", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 999 },
          { x: 2, y: 500 },
        ]}
        options={{ y: { domain: { min: 50, max: 1000 } }, points: { dotRadius: 0.3 } }}
        width={2}
        height={2}
        decimationThreshold={0.1}
      />,
    );

    expect(screen.getAllByTestId("dot").length).toBe(2);
  });

  it("should not decimate points if graph width is enough to render all points", () => {
    render(
      <ScatterPlot
        data={[
          { x: 1, y: 999 },
          { x: 2, y: 999 },
        ]}
        width={300}
        height={300}
        options={{ points: { dotRadius: 0.3 } }}
        decimationThreshold={0.1}
      />,
    );

    expect(screen.getAllByTestId("dot").length).toBe(2);
  });
});
