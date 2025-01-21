import { HttpResponse, http } from "msw";
const apng =
  "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAAACGFjVEwAAAADAAAAAM7tusAAAAAMUExURQMDAwAAAJKSkv8AAGIb5p4AAAABdFJOUwBA5thmAAAAGmZjVEwAAAAAAAAABQAAAAUAAAAAAAAAAAAUAGQAANMipokAAAAOSURBVAjXY2AEAQYcJAABlQAaPUDJKQAAABpmY1RMAAAAAQAAAAUAAAAFAAAAAAAAAAAAFABkAABIUUxdAAAAEmZkQVQAAAACCNdjYAYBBhwkAASDAEy9AgcTAAAAGmZjVEwAAAADAAAABQAAAAUAAAAAAAAAAAAUAGQAAKXHn7QAAAASZmRBVAAAAAQI12NgAgEGHCQAAwwAMyEXezIAAAAbdEVYdFNvZnR3YXJlAEFQTkcgQXNzZW1ibGVyIDIuN8Hj04gAAAAASUVORK5CYII=";

const toArrayBuffer = (buffer: Buffer<ArrayBuffer>) => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

export const handlers = [
  http.get("http://localhost/image", () => {
    const buffer = Buffer.from(apng, "base64");

    return HttpResponse.arrayBuffer(toArrayBuffer(buffer), {
      headers: { "Content-Type": "image/png" },
    });
  }),
];
