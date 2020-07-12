import { NumberKeyFrameList, VectorKeyFrameList } from "./key-frame-list";

export class ShapeKeyFrames {
  position: VectorKeyFrameList;
  strokeWeight: NumberKeyFrameList;
  // stroke: ColorKeyFrameList;
  // fill: ColorKeyFrameList;
  rotate: NumberKeyFrameList;
  scale: VectorKeyFrameList;

  constructor() {
    this.position = new VectorKeyFrameList();
    this.strokeWeight = new NumberKeyFrameList();

    this.rotate = new NumberKeyFrameList();
    this.scale = new VectorKeyFrameList();
  }
}
