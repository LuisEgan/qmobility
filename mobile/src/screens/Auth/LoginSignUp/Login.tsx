import React, { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Formik, FormikProps } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";

import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { AUTH_STACK_SCREENS_NAMES, ERRORS } from "../../../lib/constants";
import Auth from "../../../components/Auth";
import { User } from "../../../gql";
import { IAuthResponse, ILoginVars } from "../../../gql/User/mutations";
import { AuthContext } from "../../../navigation/AuthContext";

const { width, height } = Dimensions.get("window");

interface IFormValues {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup.string().email(ERRORS.INVALID_EMAIL).required(ERRORS.EMPTY_EMAIL),
  password: yup.string().required(ERRORS.EMPTY_PASSWORD),
});

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const { navigate } = useNavigation();

  const [login, { error, loading }] = useMutation<
    { login: IAuthResponse },
    ILoginVars
  >(User.mutations.login);

  // * Form Login
  const formLogin = async (values: IFormValues): Promise<void> => {
    try {
      const { data } = await login({ variables: { ...values } });

      if (data?.login.accessToken) {
        await signIn(data?.login.accessToken);
      }
    } catch (e) {
      console.warn("e: ", e);
    }
  };

  const Form = (params: FormikProps<IFormValues>) => {
    const { handleChange, handleSubmit, handleBlur, errors, touched } = params;

    return (
      <View>
        <View style={styles.contentViewIput}>
          <Input
            containerStyle={{ marginHorizontal: 0 }}
            placeholder="Email Address"
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
          />
          <Input
            containerStyle={{ marginHorizontal: 0 }}
            placeholder="Password"
            isPassword
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            onForgotPass={() => navigate(AUTH_STACK_SCREENS_NAMES.EmailPrompt)}
          />
        </View>

        {!!error && (
          <Text variant="error" style={styles.error}>
            {error.message}
          </Text>
        )}

        <Button
          enabled={!loading}
          variant="secondary"
          onPress={handleSubmit}
          label={`${loading ? "LOADING..." : "LOG IN"}`}
        />
      </View>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text variant="heading1">Welcome Back!</Text>
          <Text variant="subheadingLight">Please login to your account</Text>
        </View>

        <View style={styles.social}>
          <Auth.Google />
          <Auth.Facebook />
          <Auth.LinkedIn />
          <Auth.Apple />
        </View>

        <Text variant="body" style={styles.or}>
          OR
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={formLogin}
          validationSchema={LoginSchema}
        >
          {Form}
        </Formik>

        <View style={{ height: 70 }} />
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingHorizontal: width * 0.1,
  },

  content: {
    backgroundColor: theme.colors.white,
    marginVertical: height * 0.05,
  },

  error: { textAlign: "center", marginBottom: 10 },

  or: {
    textAlign: "center",
    marginVertical: height * 0.02,
  },

  social: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
  },

  contentViewIput: {
    marginBottom: "10%",
  },
});
