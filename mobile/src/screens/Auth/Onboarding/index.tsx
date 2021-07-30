import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "../../../components";
import { Text } from "../../../config/Theme";
import slides from "./slides";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { ESlide } from "../../../components/Slider/Slide";

const { height, width } = Dimensions.get("window");

const Onboarding = () => {
  const [onLastSlide, setOnLastSlide] = useState(false);

  const { navigate } = useNavigation();

  const skip = () => {
    navigate(AUTH_STACK_SCREENS_NAMES.TCs);
  };

  return (
    <View style={[styles.container]}>
      <Slider
        {...{ slides, width, height: height * 0.85 }}
        type={ESlide.Cards}
        onLastSlide={() => setOnLastSlide(true)}
        notOnLastSlide={() => setOnLastSlide(false)}
      />

      <TouchableOpacity onPress={skip}>
        <Text variant="bodyHighlight" color="primary" fontWeight="bold">
          {onLastSlide ? "Next" : "Skip"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
