import { detectZeroCross } from "utils/generic";

describe("Detect Zero Crossing", () => {
  it.each([
    { min: -10, max: 10 },
    { min: 0, max: 10 },
    { min: -10, max: 0 },
    { min: 0, max: 0.1 },
  ])("should detect zero crossing for interval [$min, $max]", (domain) => {
    expect(() => detectZeroCross({ log: true, domain, label: "" })).toThrow();
  });

  it.each([
    { min: -10, max: -1 },
    { min: 1, max: 10 },
    { min: 0.1, max: 0.2 },
  ])("should now throw if interval [$min, $max] does not cross zero", (domain) => {
    expect(() => detectZeroCross({ log: true, domain, label: "" })).not.toThrow();
  });

  it("should allow zero cross if axis is not log", () => {
    expect(() =>
      detectZeroCross({ log: false, domain: { min: -10, max: 10 }, label: "" }),
    ).not.toThrow();
  });
});
