/* eslint-disable no-nested-ternary */
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, Keyboard } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useNavigation } from "@react-navigation/native";
import { Header, Footer, Icons, Button } from "../../../components";
import { TEmailConfirmNavProps } from "../../../navigation/Types/NavPropsTypes";
import theme, { Text } from "../../../config/Theme";
import { AuthContext } from "../../../navigation/AuthContext";
import {
  IChangePasswordReset,
  IChangePasswordResetVars,
  IEmailConfirmationVars,
  IResendEmailVars,
  IValidateTokenVars,
} from "../../../gql/User/mutations";
import { User } from "../../../gql";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { width } = Dimensions.get("window");

type IEmailConfirm = TEmailConfirmNavProps;

const EmailConfirm = (props: IEmailConfirm) => {
  const { route, navigation } = props;

  const { signIn } = useContext(AuthContext);

  const { navigate } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  // * Mutations

  // * Validate token in case of forgotten pasword
  const [validateToken, { data: validateTokenData }] = useMutation<
    { validateToken: boolean },
    IValidateTokenVars
  >(User.mutations.validateToken);

  // * Resend email
  const [
    changePasswordRequest,
    { loading: changePasswordRequestLoading },
  ] = useMutation<
    { changePasswordRequest: IChangePasswordReset },
    IChangePasswordResetVars
  >(User.mutations.changePasswordRequest);

  // * Confirm email in case of sign up
  const [emailConfirmation, { data: emailConfirmationData }] = useMutation<
    { emailConfirmation: Record<string, unknown> },
    IEmailConfirmationVars
  >(User.mutations.emailConfirmation);

  // * Resend email if something went wrong on sign up
  const [
    resendEmailConfirmation,
    { loading: resendLoading, called: resendCalled },
  ] = useMutation<
    { resendEmailConfirmation: Record<string, unknown> },
    IResendEmailVars
  >(User.mutations.resendEmailConfirmation);

  // * State
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [goToCreateProfile, setGoToCreateProfile] = useState(false);
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  // * Trigger PIN validation
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        if (route?.params.userToken) {
          await emailConfirmation({
            variables: {
              email: route?.params?.userEmail,
              random4digits: +pin,
            },
          });
        } else {
          await validateToken({
            variables: {
              userId: route?.params.userId || "",
              token: pin,
            },
          });
        }
      } catch (e) {
        setError(e.message);
      }
    };

    if (pin.length === 4) {
      confirmEmail();
      Keyboard.dismiss();
    } else {
      setError("");
    }
  }, [pin]);

  // * Confirm PIN
  useEffect(() => {
    if (emailConfirmationData) {
      setIsEmailConfirmed(!!emailConfirmationData);
    }
  }, [emailConfirmationData]);

  // * Sign in and refirect to Create Profile
  useEffect(() => {
    const doSignIn = async () => {
      try {
        await signIn(route?.params.userToken);
      } catch (e) {
        setError(e.message);
      }
    };

    if (goToCreateProfile) {
      doSignIn();
    }
  }, [goToCreateProfile]);

  // * Redirect to change password screen
  useEffect(() => {
    if (validateTokenData) {
      navigate(AUTH_STACK_SCREENS_NAMES.NewPassword, {
        userId: route?.params.userId,
      });
    }
  }, [validateTokenData]);

  // * Resend email
  const resendEmail = async () => {
    const variables = {
      email: route?.params?.userEmail,
    };

    try {
      if (route?.params.userToken) {
        // * Signup
        await resendEmailConfirmation({
          variables,
        });
      } else {
        // * Forgot password
        await changePasswordRequest({
          variables,
        });
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Header />

      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View style={styles.body}>
              <Text variant="heading1">
                {isEmailConfirmed ? "Mail confirmed" : "Check your mailbox"}
              </Text>

              <Text variant="subheadingLight">
                {isEmailConfirmed
                  ? "Congratulations! You're in!"
                  : "Enter the secret PIN code"}
              </Text>

              <View style={styles.viewStyle}>
                {isEmailConfirmed && (
                  <Icons icon="Done" fill={theme.colors.primary} />
                )}
              </View>

              <Text variant="body">{route?.params?.userEmail}</Text>

              <View style={styles.viewStyle}>
                <SmoothPinCodeInput
                  cellStyle={{
                    borderBottomWidth: 2,
                    borderColor: "gray",
                  }}
                  cellStyleFocused={{
                    borderColor: "black",
                  }}
                  value={pin}
                  onTextChange={setPin}
                />
              </View>

              <Text variant="error">{error}</Text>
            </View>

            {isEmailConfirmed && (
              <Button
                label="GO TO PROFILE"
                iconRight="ArrowForward"
                variant="primary"
                onPress={() => setGoToCreateProfile(true)}
                containerStyle={{ marginHorizontal: "10%", width: width * 0.8 }}
              />
            )}
          </View>
        </ScrollView>

        {!isEmailConfirmed && (
          <Footer
            title="Something went wrong?"
            subTitle={`${
              resendLoading || changePasswordRequestLoading
                ? "Sending..."
                : resendCalled
                  ? "Sent!"
                  : "Resend email"
            }`}
            onPressSubtitle={resendEmail}
          />
        )}
      </View>
    </>
  );
};

export default EmailConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  body: {
    marginHorizontal: "10%",
    alignItems: "center",
    marginVertical: "10%",
  },
  viewStyle: {
    marginVertical: "5%",
  },
});
