import React from "react";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import theme from "../../config/Theme";

interface IPaginationDot {
  index: number;
  currentIndex: Animated.Node<number>;
}

const PaginationDot = (props: IPaginationDot) => {
  const { index, currentIndex } = props;

  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

export default PaginationDot;

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
    backgroundColor: theme.colors.primary,
  },
});
