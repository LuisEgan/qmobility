import React, { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import * as GoogleExpo from "expo-google-app-auth";
import Icons from "../svg";
import { IAuthResponse, ISocialNetworkVars } from "../../gql/User/mutations";
import { User } from "../../gql";
import { ERRORS } from "../../lib/constants";
import { AuthContext } from "../../navigation/AuthContext";
import { LoginSignUpLoadingContext } from "../../screens/Auth/LoginSignUp/LoginSignUpLoadingContext";

const CLIENT_ID_ANDROID_EXPO = "1099445813524-32mhfo1c3m6h07hko2vrsqu1m7onkrfh.apps.googleusercontent.com";

const CLIENT_ID_ANDROID = "1099445813524-e3k26hfbitk15pqj329b95ui38thfurm.apps.googleusercontent.com";

const androidClientId = process.env.NODE_ENV === "development"
  ? CLIENT_ID_ANDROID_EXPO
  : CLIENT_ID_ANDROID;

const Google = () => {
  const { signIn } = useContext(AuthContext);
  const { setDisplayFeedbackScreen, setFeedbackMessage } = useContext(
    LoginSignUpLoadingContext,
  );

  const [googleLogin, { data: googleData }] = useMutation<
    { loginWithGoogle: IAuthResponse },
    ISocialNetworkVars
  >(User.mutations.loginWithGoogle);

  useEffect(() => {
    if (googleData) {
      const doSignIn = async () => {
        try {
          if (setFeedbackMessage) setFeedbackMessage("Welcome!");
          signIn(googleData.loginWithGoogle.accessToken);
        } catch (error) {
          setDisplayFeedbackScreen(false);
          console.error("error: ", error);
        }
      };

      doSignIn();
    }
  }, [googleData]);

  const login = async () => {
    setDisplayFeedbackScreen(true);

    try {
      const loginResult = await GoogleExpo.logInAsync({
        iosClientId:
          "576090021603-a139q50lke316eg6703o5kkde42rfu7k.apps.googleusercontent.com",
        androidClientId,
        androidStandaloneAppClientId: androidClientId,
        scopes: ["profile", "email"],
      });

      if (loginResult.type === "success") {
        const accessToken = loginResult.accessToken || "";
        googleLogin({
          variables: {
            accessToken,
          },
        });
      } else {
        throw new Error(ERRORS.LOGIN_FAILED);
      }
    } catch (error) {
      setDisplayFeedbackScreen(false);
      alert(error);
    }
  };

  return (
    <>
      <Icons icon="Google" onPress={login} />
    </>
  );
};

export default Google;
