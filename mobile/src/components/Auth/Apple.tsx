import React, { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";
import Icons from "../svg";
import { IAuthResponse, ISocialNetworkVars } from "../../gql/User/mutations";
import { User } from "../../gql";
import { AuthContext } from "../../navigation/AuthContext";
import { LoginSignUpLoadingContext } from "../../screens/Auth/LoginSignUp/LoginSignUpLoadingContext";

const isIOS = Platform.OS === "ios";

const Apple = () => {
  const { setDisplayFeedbackScreen, setFeedbackMessage } = useContext(
    LoginSignUpLoadingContext,
  );
  const { signIn } = useContext(AuthContext);

  const [appleLogin, { data: appleData }] = useMutation<
    { loginWithApple: IAuthResponse },
    ISocialNetworkVars
  >(User.mutations.loginWithApple);

  useEffect(() => {
    if (appleData) {
      const doSignIn = async () => {
        try {
          if (setFeedbackMessage) setFeedbackMessage("Welcome!");
          signIn(appleData.loginWithApple.accessToken);
        } catch (error) {
          setDisplayFeedbackScreen(false);
          console.error("error: ", error);
        }
      };

      doSignIn();
    }
  }, [appleData]);

  const login = async () => {
    setDisplayFeedbackScreen(true);
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (identityToken) {
        appleLogin({
          variables: {
            accessToken: identityToken,
          },
        });
      }
    } catch (error) {
      setDisplayFeedbackScreen(false);
      console.warn("TCL: login -> error", error);
    }
  };

  return isIOS ? <Icons icon="Apple" onPress={login} /> : null;
};

export default Apple;
