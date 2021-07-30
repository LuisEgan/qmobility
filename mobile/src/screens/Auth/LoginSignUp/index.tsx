import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { IAuthScreens } from "../../../navigation/Navigators/AuthNavigator";
import Login from "./Login";
import SignUp from "./SignUp";
import { TLoginSignUpNavProps } from "../../../navigation/Types/NavPropsTypes";
import Header from "../../../components/Header";
import theme from "../../../config/Theme";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";
import FullScreenModal from "../../Feedback/FullScreenModal";
import { LoginSignUpLoadingContext } from "./LoginSignUpLoadingContext";
import { UserLocationContext } from "../../../navigation/Navigators/UserLocationProvider";

const { height } = Dimensions.get("window");

type ILoginSignUp = TLoginSignUpNavProps;

const Tab = createMaterialTopTabNavigator();

const LOGIN_SIGNUP_STACK_SCREENS: IAuthScreens = [
  {
    name: AUTH_STACK_SCREENS_NAMES.Login,
    component: Login,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.SignUp,
    component: SignUp,
  },
];

const LoginSignUp = (props: ILoginSignUp) => {
  const { navigation, route } = props;

  const { storeUserLocation } = useContext(UserLocationContext);

  const [displayLoadingScreen, setDisplayFeedbackScreen] = useState<boolean>(
    false,
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string>("Loading...");

  // * activeScreen
  // * 0 - Login
  // * 1 - SignUp
  const { from } = route.params;
  const activeScreen = route.state ? route.state.index : from;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        await storeUserLocation();
      }
    } catch (error) {
      console.error("TCL: getPermissions -> error", error);
    }
  };

  const loadingContext = React.useMemo(
    () => ({
      setDisplayFeedbackScreen: (display: boolean) =>
        setDisplayFeedbackScreen(display),
      setFeedbackMessage: (message: string) => setFeedbackMessage(message),
    }),
    [],
  );

  return (
    <LoginSignUpLoadingContext.Provider value={loadingContext}>
      <FullScreenModal show={displayLoadingScreen} message={feedbackMessage} />

      <Header height={height * 0.17} />

      <Tab.Navigator
        lazy
        initialRouteName={AUTH_STACK_SCREENS_NAMES.Login}
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor:
              activeScreen === 0
                ? theme.colors.secondaryDark
                : theme.colors.primary,
            height: 7,
          },
          labelStyle: { fontWeight: "bold" },
          tabStyle: {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: theme.colors.borderColor,
          },
        }}
      >
        {LOGIN_SIGNUP_STACK_SCREENS.map(({ name, component }) => (
          <Tab.Screen key={name} {...{ name, component }} />
        ))}
      </Tab.Navigator>
    </LoginSignUpLoadingContext.Provider>
  );
};

export default LoginSignUp;
