import { Color } from "./types/color";

export let strokeWeight: (value: number) => void = () => {};

export let stroke: (color: Color) => void = () => {};
export let fill: (color: Color) => void = () => {};

export let circle: (size: number) => void = () => {};

export let translate: (x: number, y: number) => void = () => {};
export let rotate: (angle: number) => void = () => {};
export let scale: (xFactor: number, yFactor: number) => void = () => {};

export const setImplementation = (callbacks: {
  strokeWeight: typeof strokeWeight;
  stroke: typeof stroke;
  fill: typeof fill;
  circle: typeof circle;
  translate: typeof translate;
  rotate: typeof rotate;
  scale: typeof scale;
}) => {
  strokeWeight = callbacks.strokeWeight;
  stroke = callbacks.stroke;
  fill = callbacks.fill;
  circle = callbacks.circle;
  translate = callbacks.translate;
  rotate = callbacks.rotate;
  scale = callbacks.scale;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setP5Implementation = (p: any = window) => {
  setImplementation({
    strokeWeight: (v) => p.strokeWeight(v),
    stroke: (color) => p.stroke(color.r, color.g, color.b),
    fill: (color) => p.fill(color.r, color.g, color.b),
    circle: (size) => p.circle(0, 0, size),
    translate: (x, y) => p.translate(x, y),
    rotate: (angle) => p.rotate(angle),
    scale: (x, y) => p.scale(x, y),
  });
};
