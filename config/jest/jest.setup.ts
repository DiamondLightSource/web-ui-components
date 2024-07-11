import '@testing-library/jest-dom'
import "@testing-library/jest-dom";
import { server } from "../../src/mocks/server";

beforeEach(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

global.structuredClone = (val: Record<string, any>) => JSON.parse(JSON.stringify(val));

HTMLCanvasElement.prototype.getContext = jest.fn();