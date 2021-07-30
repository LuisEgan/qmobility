import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import theme, { Text } from "../../../config/Theme";
import { IComponentsDefaults } from "../../../lib/Types";
import { TLoadingNavProps } from "../../../navigation/Types/NavPropsTypes";

const { height } = Dimensions.get("window");

export interface IDisplayFeedbackScreen {
  setDisplayFeedbackScreen: (display: boolean) => void;
  setFeedbackMessage?: (mssg: string) => void;
}

export interface IFullScreenModal
  extends IComponentsDefaults,
    TLoadingNavProps {
  children: ReactNode;
  show: boolean;
  message: string;
}

const FullScreenModal = (props: Partial<IFullScreenModal>) => {
  const {
    route,
    children,
    containerStyle,
    show,
    message = "Loading...",
  } = props;

  const { navigate } = useNavigation();

  const transition = useTransition(!!show, { duration: 100 });
  const translateY = mix(transition, height, 0);

  useEffect(() => {
    if (route?.params.redirectTo) {
      setTimeout(() => {
        navigate(route?.params.redirectTo);
      }, 1000);
    }
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        styles.staticContainerStyles,
        { transform: [{ translateY }] },
      ]}
    >
      {children || (
        <Text color="primary" variant="heading1">
          {message}
        </Text>
      )}
    </Animated.View>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({
  staticContainerStyles: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },

  container: {
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
