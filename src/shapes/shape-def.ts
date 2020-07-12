import { Shape, ShapeParameters } from "./shape";
import { Motion } from "../motion";
import { ShapeKeyFrames } from "./shape-key-frames";

export interface ShapeDef<T extends ShapeParameters, S extends ShapeKeyFrames> {
  initialParameters: Partial<T>;

  createShape(): Shape<T, S>;

  build(): Motion;
}
