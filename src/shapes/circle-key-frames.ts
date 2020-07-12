import { NumberKeyFrameList } from "./key-frame-list";
import { ShapeKeyFrames } from "./shape-key-frames";

export class CircleKeyFrames extends ShapeKeyFrames {
  size: NumberKeyFrameList;

  constructor() {
    super();
    this.size = new NumberKeyFrameList();
  }
}
