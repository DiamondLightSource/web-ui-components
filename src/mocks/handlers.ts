import { rest } from "msw";
const apng =
  "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAAACGFjVEwAAAADAAAAAM7tusAAAAAMUExURQMDAwAAAJKSkv8AAGIb5p4AAAABdFJOUwBA5thmAAAAGmZjVEwAAAAAAAAABQAAAAUAAAAAAAAAAAAUAGQAANMipokAAAAOSURBVAjXY2AEAQYcJAABlQAaPUDJKQAAABpmY1RMAAAAAQAAAAUAAAAFAAAAAAAAAAAAFABkAABIUUxdAAAAEmZkQVQAAAACCNdjYAYBBhwkAASDAEy9AgcTAAAAGmZjVEwAAAADAAAABQAAAAUAAAAAAAAAAAAUAGQAAKXHn7QAAAASZmRBVAAAAAQI12NgAgEGHCQAAwwAMyEXezIAAAAbdEVYdFNvZnR3YXJlAEFQTkcgQXNzZW1ibGVyIDIuN8Hj04gAAAAASUVORK5CYII=";

export const handlers = [
  rest.get("http://localhost/image", (req, res, ctx) => {
    const buffer = Buffer.from(apng, "base64");

    return res(
      ctx.status(200),
      ctx.set("Content-Type", "image/png"),
      ctx.body(buffer),
      ctx.delay(0),
      ctx.set("Content-Length", buffer.length.toString())
    );
  }),
];
