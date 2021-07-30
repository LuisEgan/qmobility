// eslint-disable
import { createContext } from "react";
import { IDisplayFeedbackScreen } from "../../Feedback/FullScreenModal";

export const LoginSignUpLoadingContext = createContext<IDisplayFeedbackScreen>({
  setDisplayFeedbackScreen: () => null,
  setFeedbackMessage: () => null,
});
