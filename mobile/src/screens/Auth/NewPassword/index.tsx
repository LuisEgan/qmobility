/* eslint-disable no-nested-ternary */
import React, { useLayoutEffect, useState } from "react";
import * as yup from "yup";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { Header, Button, Input } from "../../../components";
import { TNewPasswordNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import {
  AUTH_STACK_SCREENS_NAMES,
  ERRORS,
  REGEX,
} from "../../../lib/constants";
import { User } from "../../../gql";
import { IChangePasswordVars } from "../../../gql/User/mutations";
import { IUser } from "../../../gql/User/Types";

const validateSchema = yup.object().shape({
  password: yup
    .string()
    .required(ERRORS.EMPTY_PASSWORD)
    .matches(REGEX.PASSWORD, ERRORS.INVALID_PASSWORD),
});

interface IFormValues {
  password: string;
}

type IEmailConfirm = TNewPasswordNavProps;

const NewPassword = (props: IEmailConfirm) => {
  const { route, navigation } = props;

  const { navigate } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  const [changePassword, { loading }] = useMutation<
    { changePassword: IUser },
    IChangePasswordVars
  >(User.mutations.changePassword);

  const [success, setSuccess] = useState<boolean>(false);

  // * Handlers
  const updatePassword = async (values: IFormValues) => {
    try {
      const { data } = await changePassword({
        variables: {
          password: values.password,
          userId: route.params.userId,
        },
      });

      setSuccess(!!data?.changePassword.id);
    } catch (error) {
      console.error("error: ", error);
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
                {success
                  ? "Success! You can log in now"
                  : "Enter your new password"}
              </Text>

              <View style={styles.viewStyle}>
                {!success ? (
                  <Formik
                    initialValues={{ password: "" }}
                    onSubmit={updatePassword}
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
                          placeholder="New password"
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                          error={errors.password}
                          touched={touched.password}
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
                ) : (
                  <Button
                    variant="primary"
                    label="Go to login page"
                    onPress={() => navigate(AUTH_STACK_SCREENS_NAMES.Login)}
                    containerStyle={{ marginTop: 50 }}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NewPassword;

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
