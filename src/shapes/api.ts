import { CircleParameters } from "./circle";
import { CircleDef } from "./circle-def";

export const circleDef = (parameters: CircleParameters) =>
  new CircleDef(parameters);
