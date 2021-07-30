/* eslint import/prefer-default-export: "off" */
import { createContext } from "react";

interface IFeedbackMethods {
  setIsLoading: (isLoading: boolean) => void;
}
const feedbackMethods = {
  setIsLoading: () => null,
};
export const FeedbackContext = createContext<IFeedbackMethods>(feedbackMethods);
