import { Shape, ShapeParameters } from "./shape";
import { circle } from "../common";
import { CircleDef } from "./circle-def";
import { CircleKeyFrames } from "./circle-key-frames";
import { NumberAttribute } from "../types/attribute";

export interface CircleParameters extends ShapeParameters {
  size: number;
}

export class Circle extends Shape<CircleParameters, CircleKeyFrames> {
  size: NumberAttribute;
  updateSize: (frame: number) => void = () => {};

  constructor(circleDef: CircleDef) {
    super(circleDef);
    this.size = new NumberAttribute(circleDef.initialParameters.size || 100.0);
    this.keyFrames.size.prepare(this.size);
  }

  drawShape(): void {
    circle(this.size.value);
  }

  applyKeyFrames(): void {
    super.applyKeyFrames();

    const kf = this.keyFrames;
    const frameCount = this.frameCount;

    const updateSize = kf.size.getUpdater(frameCount, this.size);
    if (updateSize) this.updateSize = updateSize;

    this.updateSize(frameCount);
  }
}
