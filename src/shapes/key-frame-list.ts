import { ProperKeyFrame } from "./key-frame";
import {
  Attribute,
  NumberAttribute,
  VectorAttribute,
} from "../types/attribute";
import * as Ease from "../easing";

const makeEasing = (name: string) => {
  switch (name.toLowerCase()) {
    case "linear":
      return Ease.linear;
    case "easeinquad":
      return Ease.In.quad;
    case "easeincubic":
      return Ease.In.cubic;
    case "easeinquart":
      return Ease.In.quart;
    case "easeinexpo":
      return Ease.In.expo;
    case "easeoutquad":
      return Ease.Out.quad;
    case "easeoutcubic":
      return Ease.Out.cubic;
    case "easeoutquart":
      return Ease.Out.quart;
    case "easeoutexpo":
      return Ease.Out.expo;
  }
  throw `Invalid easing name: ${name}`;
};

type EasingSpecifier = string | ((ratio: number) => number);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class KeyFrameList<V> {
  list: ProperKeyFrame<V>[] = [];

  constructor() {}

  makeAttribute(value: V): Attribute<V> {
    throw `not implemented. (value: ${value})`;
  }

  addKeyFrame(frame: number, value: V, easing?: EasingSpecifier) {
    let easeFunc: ((ratio: number) => number) | undefined;
    if (typeof easing === "string") easeFunc = makeEasing(easing);
    else easeFunc = easing;
    this.list.push(
      new ProperKeyFrame(frame, this.makeAttribute(value), easeFunc)
    );
  }

  sort(): void {
    this.list.sort((a, b) => a.frame - b.frame);
  }

  hasZero(): boolean {
    return this.list.find((keyFrame) => keyFrame.frame == 0) != undefined;
  }

  prepare(initialAttribute: Attribute<V>): void {
    if (!this.hasZero())
      this.list.push(new ProperKeyFrame(0, initialAttribute));
    this.sort();
  }

  getUpdater(currentProperFrame: number, attribute: Attribute<V>) {
    const list = this.list;
    if (list.length !== 0) {
      const firstKeyFrame = list[0];
      if (firstKeyFrame.frame == currentProperFrame) {
        if (2 <= list.length) {
          const nextX = list[1];
          list.shift();
          return nextX.buildShapeOperator(firstKeyFrame, attribute);
        } else {
          list.pop();
          return () => {};
        }
      }
    }
    return undefined;
  }
}

export class NumberKeyFrameList extends KeyFrameList<number> {
  makeAttribute(value: number): NumberAttribute {
    return new NumberAttribute(value);
  }
}

export class VectorKeyFrameList extends KeyFrameList<{ x: number; y: number }> {
  makeAttribute(value: { x: number; y: number }): VectorAttribute {
    return new VectorAttribute(value.x, value.y);
  }
}
