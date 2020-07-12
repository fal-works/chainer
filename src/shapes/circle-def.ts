import { Circle, CircleParameters } from "./circle";
import { CircleKeyFrames } from "./circle-key-frames";
import { ShapeDef } from "./shape-def";
import { Motion } from "../motion";

export class CircleDef extends CircleKeyFrames
  implements ShapeDef<CircleParameters, CircleKeyFrames> {
  initialParameters: Partial<CircleParameters>;

  constructor(initialParameters: CircleParameters) {
    super();
    this.initialParameters = initialParameters;
  }

  createShape(): Circle {
    return new Circle(this);
  }

  build(): Motion {
    return new Motion(this.createShape());
  }
}
