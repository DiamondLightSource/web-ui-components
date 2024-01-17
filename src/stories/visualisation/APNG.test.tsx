import { screen, render, waitFor } from "@testing-library/react";
import { APNGViewer } from "stories/visualisation/APNG";
import { server } from "mocks/server";
import { HttpResponse, http } from "msw";

global.URL.createObjectURL = () => "image.png";

describe("APNG", () => {
  it("should render valid png image", async () => {
    render(<APNGViewer src='http://localhost/image' />);
    await screen.findByLabelText(/frame image/i);
  });

  it("should fire callback when frame count changes", async () => {
    const frameCountChangedCallback = jest.fn();

    render(
      <APNGViewer src='http://localhost/image' onFrameCountChanged={frameCountChangedCallback} />,
    );
    await waitFor(() => expect(frameCountChangedCallback).toHaveBeenCalledWith(3));
  });

  it("should display message when no image data is available", async () => {
    server.use(http.get("http://localhost/image", () => HttpResponse.text(null, { status: 404 })));
    render(<APNGViewer src='http://localhost/image' />);
    await screen.findByText(/no image data available/i);
  });

  it("should display message when APNG file parsing fails", async () => {
    server.use(
      http.get("http://localhost/image", () =>
        HttpResponse.arrayBuffer(Buffer.from("notAValidPNG", "base64"), {
          headers: { "Content-Type": "image/png" },
        }),
      ),
    );
    render(<APNGViewer src='http://localhost/image' />);
    await screen.findByText(/no image data available/i);
  });

  it("should display caption if provided", async () => {
    server.use(http.get("http://localhost/image", () => HttpResponse.text(null, { status: 404 })));
    render(<APNGViewer caption='Caption Text' src='http://localhost/image' />);
    await screen.findByText(/caption text/i);
  });

  it("should shortcircuit to being a basic image wrapper if autoplay is set", async () => {
    server.use(http.get("http://localhost/image", () => HttpResponse.text(null, { status: 404 })));
    render(<APNGViewer caption='Caption Text' src='http://localhost/image' autoplay={true} />);
    await screen.findByLabelText(/frame image/i);
  });
});
