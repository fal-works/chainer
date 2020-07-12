import { Attribute } from "../types/attribute";

export class ReferenceKeyFrame {
  constructor(public frame: number) {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ProperKeyFrame<V> {
  constructor(
    public frame: number,
    public value: Attribute<V>,
    public easing = (ratio: number) => ratio
  ) {}

  buildShapeOperator(
    lastKeyFrame: ProperKeyFrame<V>,
    attribute: Attribute<V>
  ): (properFrame: number) => void {
    const lastFrame = lastKeyFrame.frame;
    const duration = this.frame - lastFrame;
    const startValue = attribute.clone();
    const endValue = this.value;

    return (properFrame: number) => {
      const easedRatio = this.easing((properFrame - lastFrame) / duration);
      attribute.update(startValue, endValue, easedRatio);
    };
  }
}
