/* eslint import/prefer-default-export: "off" */
import { createContext } from "react";

interface IMethods {
  isHidden: () => boolean;
}
const methods = {
  isHidden: () => true,
};
export const KeyboardContext = createContext<IMethods>(methods);
