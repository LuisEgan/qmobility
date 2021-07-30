/* eslint-disable no-nested-ternary */
import React, { useLayoutEffect } from "react";
import * as yup from "yup";
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { Header, Button, Input } from "../../../components";
import { TEmailConfirmNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import { AUTH_STACK_SCREENS_NAMES, ERRORS } from "../../../lib/constants";
import { User } from "../../../gql";
import {
  IChangePasswordReset,
  IChangePasswordResetVars,
} from "../../../gql/User/mutations";

const validateSchema = yup.object().shape({
  email: yup.string().email(ERRORS.INVALID_EMAIL).required(ERRORS.EMPTY_EMAIL),
});

interface IFormValues {
  email: string;
}

type IEmailConfirm = TEmailConfirmNavProps;

const EmailPrompt = (props: IEmailConfirm) => {
  const { route, navigation } = props;

  const { goBack, navigate } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  const [changePasswordRequest, { loading }] = useMutation<
    { changePasswordRequest: IChangePasswordReset },
    IChangePasswordResetVars
  >(User.mutations.changePasswordRequest);

  // * Handlers
  const validateEmail = async (values: IFormValues) => {
    try {
      const { data } = await changePasswordRequest({
        variables: { email: values.email },
      });

      if (data?.changePasswordRequest?.id) {
        navigate(AUTH_STACK_SCREENS_NAMES.EmailConfirm, {
          userEmail: values.email,
          userId: data.changePasswordRequest.id,
        });
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("error: ", error.message);
    }
  };

  return (
    <>
      <Header icon="ArrowBack" onPress={goBack} />

      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View style={styles.body}>
              <Text variant="heading1">Enter your email</Text>

              <Text variant="body">{route?.params?.userEmail}</Text>

              <View style={styles.viewStyle}>
                <Formik
                  initialValues={{ email: "" }}
                  onSubmit={validateEmail}
                  validationSchema={validateSchema}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                  }) => (
                    <>
                      <Input
                        containerStyle={{ marginHorizontal: 0 }}
                        placeholder="email@yourdomail.com"
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        error={errors.email}
                        touched={touched.email}
                      />
                      <Button
                        enabled={!loading}
                        label="Change password"
                        variant={loading ? "default" : "primary"}
                        onPress={handleSubmit}
                      />
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default EmailPrompt;

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
    width: "100%",
  },
});
