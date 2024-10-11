import { CompleteScatterPlotOptions } from "utils/interfaces";

export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export const mergeDeep = (target: Record<string, any>, source: Record<string, any>) => {
  let output = structuredClone(target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export const debounce = (fn: Function, ms = 300) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

/**
 * Detect zero crossing if axis uses log scale and throw exception
 * @param axis Axis to verify
 * @throws If passed domain crosses 0
 */
export const detectZeroCross = (axis: CompleteScatterPlotOptions["y"]) => {
  if (axis.log && 0 >= axis.domain.min && 0 <= axis.domain.max) {
    throw new Error("Domain in axis must not cross 0 if using log scale, for log(0) = inf");
  }
};

/**
 * Round number to N digits of fractional precision
 * @param value Original value
 * @param digits Maximum digits of fraction precision to use
 * @returns Rounded number
 */
export const roundTo = (value: number, digits: number) =>
  value.toLocaleString("en-GB", { maximumFractionDigits: digits });
