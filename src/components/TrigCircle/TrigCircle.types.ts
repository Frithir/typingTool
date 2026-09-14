import type { TrigFunctionName } from "./utils";

export type TrigDiagramProps = {
  angleDeg: number;
  size?: number;
  // When set, dims every segment except this one and hides its label so it
  // can be used as a "which function is this?" quiz prompt.
  isolate?: TrigFunctionName;
  showValues?: boolean;
};
