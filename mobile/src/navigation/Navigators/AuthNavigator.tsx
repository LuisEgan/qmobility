import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Onboarding,
  TCs,
  LoginSignUp,
  Access,
  EmailConfirm,
  EmailPrompt,
  NewPassword,
} from "../../screens/Auth";
import { IScreen } from "../Router";
import {
  ASYNC_STORAGE_ITEMS,
  AUTH_STACK_SCREENS_NAMES,
} from "../../lib/constants";
import { FullScreenModal } from "../../screens/Feedback";

type IScreens = Array<IScreen>;
export type IAuthScreens = Array<IScreen>;
export const AUTH_STACK_SCREENS: IScreens = [
  {
    name: AUTH_STACK_SCREENS_NAMES.Onboarding,
    component: Onboarding,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.TCs,
    component: TCs,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.Access,
    component: Access,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.LoginSignUp,
    component: LoginSignUp,
    headerShown: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.EmailConfirm,
    component: EmailConfirm,
    headerShown: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.EmailPrompt,
    component: EmailPrompt,
    headerShown: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.NewPassword,
    component: NewPassword,
    headerShown: true,
  },
];

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
  const [initialRouteName, setInitialRouteName] = useState<string>();

  useEffect(() => {
    const checkTCs = async () => {
      const hasAcceptedTCs = await AsyncStorage.getItem(
        ASYNC_STORAGE_ITEMS.HAS_ACCEPTED_TCS,
      );

      setInitialRouteName(
        hasAcceptedTCs
          ? AUTH_STACK_SCREENS_NAMES.Access
          : AUTH_STACK_SCREENS_NAMES.Onboarding,
      );
    };

    checkTCs();
  }, []);

  if (!initialRouteName) return <FullScreenModal show />;

  return (
    <Navigator initialRouteName={initialRouteName}>
      {AUTH_STACK_SCREENS.map(({ name, component, headerShown }) => {
        const options = { headerShown: headerShown || false };
        return <Screen key={name} {...{ name, component, options }} />;
      })}
    </Navigator>
  );
};

export default AuthNavigator;
