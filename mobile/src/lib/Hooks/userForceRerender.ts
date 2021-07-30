import React from "react";

export const useForceRerender = (): (() => void) =>
  React.useReducer(() => ({}), {})[1] as () => void;
