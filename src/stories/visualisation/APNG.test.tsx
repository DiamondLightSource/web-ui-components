import { screen, render, waitFor } from "@testing-library/react";
import { APNGViewer } from "stories/visualisation/APNG";
import { server } from "mocks/server";
import { rest } from "msw";

global.URL.createObjectURL = () => "image.png";

describe("APNG", () => {
  it("should render valid png image", async () => {
    render(<APNGViewer src='image' />);
    await screen.findByLabelText(/frame image/i);
  });

  it("should fire callback when frame count changes", async () => {
    const frameCountChangedCallback = jest.fn();

    render(<APNGViewer src='image' onFrameCountChanged={frameCountChangedCallback} />);
    await waitFor(() => expect(frameCountChangedCallback).toHaveBeenCalledWith(3));
  });

  it("should display message when no image data is available", async () => {
    server.use(rest.get("http://localhost/image", (req, res, ctx) => res.once(ctx.status(404))));
    render(<APNGViewer src='image' />);
    await screen.findByText(/no image data available/i);
  });

  it("should display message when APNG file parsing fails", async () => {
    server.use(
      rest.get("http://localhost/image", (req, res, ctx) =>
        res.once(
          ctx.status(200),
          ctx.set("Content-Type", "image/png"),
          ctx.body("notAValidAPNGImage"),
          ctx.delay(0),
          ctx.set("Content-Length", "18"),
        ),
      ),
    );
    render(<APNGViewer src='image' />);
    await screen.findByText(/no image data available/i);
  });

  it("should display caption if provided", async () => {
    server.use(rest.get("http://localhost/image", (req, res, ctx) => res.once(ctx.status(404))));
    render(<APNGViewer caption='Caption Text' src='image' />);
    await screen.findByText(/caption text/i);
  });

  it("should shortcircuit to being a basic image wrapper if autoplay is set", async () => {
    server.use(rest.get("http://localhost/image", (req, res, ctx) => res.once(ctx.status(404))));
    render(<APNGViewer caption='Caption Text' src='image' autoplay={true} />);
    await screen.findByLabelText(/frame image/i);
  });
});
