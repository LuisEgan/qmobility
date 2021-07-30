import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TAllNavProps } from "./Types/NavPropsTypes";
import RootNavigator from "./Navigators/RootNavigator";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen & TAllNavProps>;
  headerShown?: boolean;
}

const Router = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

export default Router;
