import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../../components";
import {
  ASYNC_STORAGE_ITEMS,
  AUTH_STACK_SCREENS_NAMES,
} from "../../../lib/constants";

import bg from "../../../assets/png/accessBackgroundMedium.png";
import isologo from "../../../assets/png/isologo.png";
import { TAccessNavProps } from "../../../navigation/Types/NavPropsTypes";

const { height, width } = Dimensions.get("window");

type IAccess = TAccessNavProps;

const Access = (props: IAccess) => {
  const { navigation } = props;
  const { navigate } = useNavigation();

  useEffect(() => {
    const setHasAcceptedTCs = async () => {
      await AsyncStorage.setItem(ASYNC_STORAGE_ITEMS.HAS_ACCEPTED_TCS, "true");
    };

    setHasAcceptedTCs();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  return (
    <ImageBackground source={bg} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.isologoContainer}>
          <View style={styles.isologo}>
            <ImageBackground source={isologo} style={styles.image} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.contentButton}>
            <View style={styles.ButtonStyle}>
              <Button
                variant="primary"
                onPress={() =>
                  navigate(AUTH_STACK_SCREENS_NAMES.LoginSignUp, {
                    screen: AUTH_STACK_SCREENS_NAMES.SignUp,
                    from: 1,
                  })}
                label="SIGN UP"
                containerStyle={styles.button}
              />
            </View>
            <View style={styles.ButtonStyle}>
              <Button
                variant="secondary"
                onPress={() =>
                  navigate(AUTH_STACK_SCREENS_NAMES.LoginSignUp, {
                    screen: AUTH_STACK_SCREENS_NAMES.Login,
                    from: 0,
                  })}
                label="LOGIN"
                containerStyle={styles.button}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Access;

const styles = StyleSheet.create({
  isologoContainer: {
    position: "absolute",
    top: height * 0.15,
    width,
    alignItems: "center",
  },
  isologo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: "100%",
    height: "100%",
  },
  contentButton: {
    position: "absolute",
    bottom: "15%",
    left: 0,
    right: 0,
  },
  ButtonStyle: {
    marginVertical: "2%",
  },
  button: { marginHorizontal: "10%", width: width * 0.8 },
});
