import { Defaults } from "../defaults";
import {
  strokeWeight,
  stroke,
  fill,
  translate,
  rotate,
  scale,
} from "../common";
import { Color } from "../types/color";
import { ShapeDef } from "./shape-def";
import { ShapeKeyFrames } from "./shape-key-frames";
import { NumberAttribute, VectorAttribute } from "../types/attribute";

export interface ShapeParameters {
  position: { x: number; y: number };
  strokeWeight: number;
  stroke: { r: number; g: number; b: number };
  fill: { r: number; g: number; b: number };
  rotate: number;
  scale: { x: number; y: number };
}

export class Shape<T extends ShapeParameters, S extends ShapeKeyFrames> {
  frameCount = 0;
  visible = true;

  position: VectorAttribute;
  strokeWeight: NumberAttribute;
  stroke: Color;
  fill: Color;
  rotate: NumberAttribute;
  scale: VectorAttribute;

  keyFrames: S;

  updatePosition: (frame: number) => void = () => {};
  updateStrokeWeight: (frame: number) => void = () => {};
  updateRotate: (frame: number) => void = () => {};
  updateScale: (frame: number) => void = () => {};

  constructor(definition: ShapeDef<T, S>) {
    const prm = definition.initialParameters || {};

    this.position = VectorAttribute.from(prm.position, 0.0, 0.0);
    this.strokeWeight = new NumberAttribute(
      prm.strokeWeight || Defaults.strokeWeight
    );

    this.stroke = Object.create(prm.stroke || Defaults.stroke);
    this.fill = Object.create(prm.fill || Defaults.fill);

    this.rotate = new NumberAttribute(prm.rotate || 0.0);
    this.scale = VectorAttribute.from(prm.scale, 1.0, 1.0);

    const keyFrames: S = Object.create(definition);
    keyFrames.position.prepare(this.position);
    keyFrames.strokeWeight.prepare(this.strokeWeight);
    keyFrames.rotate.prepare(this.rotate);
    keyFrames.scale.prepare(this.scale);
    this.keyFrames = keyFrames;
  }

  applyKeyFrames(): void {
    const kf = this.keyFrames;
    const frameCount = this.frameCount;

    const updatePosition = kf.position.getUpdater(frameCount, this.position);
    if (updatePosition) this.updatePosition = updatePosition;

    const updateStrokeWeight = kf.strokeWeight.getUpdater(
      frameCount,
      this.strokeWeight
    );
    if (updateStrokeWeight) this.updateStrokeWeight = updateStrokeWeight;

    const updateRotate = kf.rotate.getUpdater(frameCount, this.rotate);
    if (updateRotate) this.updateRotate = updateRotate;

    const updateScale = kf.scale.getUpdater(frameCount, this.scale);
    if (updateScale) this.updateScale = updateScale;

    this.updatePosition(frameCount);
    this.updateStrokeWeight(frameCount);
    this.updateRotate(frameCount);
    this.updateScale(frameCount);
  }

  draw(): void {
    this.applyKeyFrames();

    strokeWeight(this.strokeWeight.value);
    stroke(this.stroke);
    fill(this.fill);

    const {
      position: { x, y },
      rotate: rotationAngle,
      scale: { x: scaleX, y: scaleY },
    } = this;
    if (scaleX != 0.0 && scaleY != 0.0) {
      translate(x, y);
      rotate(rotationAngle.value);
      scale(scaleX, scaleY);
      this.drawShape();
      scale(1 / scaleX, 1 / scaleY);
      rotate(-rotationAngle);
      translate(-x, -y);
    }

    this.frameCount += 1;
  }

  drawShape(): void {}
}
