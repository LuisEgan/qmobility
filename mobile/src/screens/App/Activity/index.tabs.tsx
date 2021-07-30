import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { IAuthScreens } from "../../../navigation/Navigators/AuthNavigator";
import Stats from "./Stats";

const { height } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

const ACTIVITY_STACK_SCREENS: IAuthScreens = [
  {
    name: "MONTH",
    component: Stats,
  },
  {
    name: "WEEK",
    component: Stats,
  },
  {
    name: "UP TO DATE",
    component: Stats,
  },
];

const Activity = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: theme.colors.white,
          paddingTop: height * 0.07,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Icons icon="ArrowBack" onPress={goBack} />

          <TouchableOpacity
            onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyMatch)}
          >
            <Text variant="bodyHighlightBold">My Match</Text>
          </TouchableOpacity>
        </View>

        <Text variant="heading1">eActivity</Text>
      </View>

      <Tab.Navigator
        lazy
        initialRouteName="ACTIVITY-UP-TO-DATE"
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: theme.colors.primary,
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
        {ACTIVITY_STACK_SCREENS.map(({ name, component }) => (
          <Tab.Screen key={name} {...{ name, component }} />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.white,
  },
  container: {
    height,
  },
});
