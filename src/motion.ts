import { Shape, ShapeParameters } from "./shapes/shape";
import { ShapeKeyFrames } from "./shapes/shape-key-frames";

export class Motion {
  currentShapes: Shape<ShapeParameters, ShapeKeyFrames>[];

  constructor(firstNode: Shape<ShapeParameters, ShapeKeyFrames>) {
    this.currentShapes = [firstNode];
  }

  draw(): void {
    for (const shape of this.currentShapes) shape.draw();
  }
}
