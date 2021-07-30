/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useMemo } from "react";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useApolloClient } from "@apollo/client";
import { AuthContext } from "../AuthContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { TUserToken } from "../Types/AuthTypes";
import { ASYNC_STORAGE_ITEMS } from "../../lib/constants";
import UserLocationProvider from "./UserLocationProvider";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [userToken, setUserToken] = useState<TUserToken>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const client = useApolloClient();

  const signOut = async () => {
    await AsyncStorage.removeItem(ASYNC_STORAGE_ITEMS.USER_TOKEN);
    await AsyncStorage.removeItem(ASYNC_STORAGE_ITEMS.HAS_ACCEPTED_TCS);
    client.resetStore();
    setUserToken(null);
  };

  // * Set user token from cached data
  useEffect(() => {
    const setInitialUserToken = async () => {
      let newUserToken: TUserToken = null;
      try {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);

        if (status !== "granted") {
          await signOut();
          return;
        }

        newUserToken = await AsyncStorage.getItem(
          ASYNC_STORAGE_ITEMS.USER_TOKEN,
        );
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setUserToken(newUserToken);
        setLoading(false);
      }
    };

    setInitialUserToken();
  }, []);

  // * Set contexts values
  const authContext = useMemo(
    () => ({
      signIn: async (token?: string) =>
        new Promise<void>((resolve, reject) => {
          const doSignIn = async () => {
            try {
              await AsyncStorage.setItem(
                ASYNC_STORAGE_ITEMS.USER_TOKEN,
                token || "",
              );
              setUserToken(token || "");
              resolve();
            } catch (error) {
              console.error("error: ", error);
              reject();
            }
          };

          doSignIn();
        }),
      signOut,
    }),
    [],
  );

  // * Loading screen
  const LoadingScreen = () => null;

  return (
    <AuthContext.Provider value={authContext}>
      <UserLocationProvider>
        <RootStack.Navigator
          headerMode="none"
          screenOptions={{ animationEnabled: false }}
          mode="modal"
        >
          {loading ? (
            <RootStack.Screen name="Loading" component={LoadingScreen} />
          ) : userToken ? (
            <RootStack.Screen name="AppNavigator" component={AppNavigator} />
          ) : (
            <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </UserLocationProvider>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
