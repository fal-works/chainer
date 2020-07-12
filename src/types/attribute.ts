export interface Attribute<T> {
  update(last: Attribute<T>, target: Attribute<T>, easingRatio: number): void;

  set(value: T): void;

  clone(): Attribute<T>;
}

export class NumberAttribute implements Attribute<number> {
  constructor(public value: number) {}

  update(
    last: NumberAttribute,
    target: NumberAttribute,
    easingRatio: number
  ): void {
    const displacement = target.value - last.value;
    this.value = last.value + easingRatio * displacement;
  }

  set(value: number): void {
    this.value = value;
  }

  clone(): NumberAttribute {
    return new NumberAttribute(this.value);
  }
}

export class VectorAttribute implements Attribute<{ x: number; y: number }> {
  public static from(obj?: { x: number; y: number }, defX = 0.0, defY = 0.0) {
    if (obj) return new VectorAttribute(obj.x, obj.y);
    else return new VectorAttribute(defX, defY);
  }

  constructor(public x: number, public y: number) {}

  update(
    last: VectorAttribute,
    target: VectorAttribute,
    easingRatio: number
  ): void {
    const { x: lastX, y: lastY } = last;
    const xDisplacement = target.x - lastX;
    const yDisplacement = target.y - lastY;
    this.x = lastX + easingRatio * xDisplacement;
    this.y = lastY + easingRatio * yDisplacement;
  }

  set(value: { x: number; y: number }): void {
    this.x = value.x;
    this.y = value.y;
  }

  clone(): VectorAttribute {
    return new VectorAttribute(this.x, this.y);
  }
}
