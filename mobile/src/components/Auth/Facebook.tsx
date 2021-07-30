import React, { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import * as FacebookExpo from "expo-facebook";
import Icons from "../svg";
import { ERRORS } from "../../lib/constants";
import { User } from "../../gql";
import { IAuthResponse, ISocialNetworkVars } from "../../gql/User/mutations";
import { AuthContext } from "../../navigation/AuthContext";
import { LoginSignUpLoadingContext } from "../../screens/Auth/LoginSignUp/LoginSignUpLoadingContext";

const Facebook = () => {
  const { setDisplayFeedbackScreen, setFeedbackMessage } = useContext(
    LoginSignUpLoadingContext,
  );
  const { signIn } = useContext(AuthContext);

  const [fbLogin, { data: fbData }] = useMutation<
    { loginWithFacebook: IAuthResponse },
    ISocialNetworkVars
  >(User.mutations.loginWithFacebook);

  useEffect(() => {
    if (fbData) {
      const doSignIn = async () => {
        try {
          if (setFeedbackMessage) setFeedbackMessage("Welcome!");
          signIn(fbData.loginWithFacebook.accessToken);
        } catch (error) {
          setDisplayFeedbackScreen(false);
          console.error("error: ", error);
        }
      };

      doSignIn();
    }
  }, [fbData]);

  const login = async () => {
    try {
      // TODO facebook appId on .env
      await FacebookExpo.initializeAsync(
        "1026980881044780",
        "Eve Mobile App #1",
      );
      const loginResult = await FacebookExpo.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      setDisplayFeedbackScreen(true);

      if (loginResult.type === "success") {
        fbLogin({
          variables: {
            accessToken: loginResult.token,
          },
        });
      } else {
        throw new Error(ERRORS.LOGIN_FAILED);
      }
    } catch ({ message }) {
      setDisplayFeedbackScreen(false);
      alert(message);
    }
  };

  return <Icons icon="Facebook" onPress={login} />;
};

export default Facebook;
