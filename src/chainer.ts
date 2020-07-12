import { setP5Implementation } from "./common";
export { setImplementation } from "./common";

export * from "./shapes/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeP5 = (p5Instance?: any) => {
  setP5Implementation(p5Instance);
};
