import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../config/Theme";

export const Title = (str: string): JSX.Element => (
  <Text
    variant="heading1"
    style={[styles.textScrollStyle, { fontSize: 16 }]}
    color="primary"
  >
    {str}
  </Text>
);

export const textBlack = (str: string): JSX.Element => (
  <Text variant="heading1" style={[styles.textScrollStyle, { fontSize: 14 }]}>
    {str}
  </Text>
);

export const textLight = (str: string): JSX.Element => (
  <Text
    variant="subheadingLight"
    style={[styles.textScrollStyle, { fontSize: 14 }]}
  >
    {str}
  </Text>
);

export const StepText = (num: number, str: string): JSX.Element => (
  <View style={styles.stepStyle}>
    <Text
      variant="subheadingLight"
      style={[styles.textScrollStyle, { fontSize: 14 }]}
    >
      <Text variant="heading1" style={{ fontSize: 14 }}>
        {`· Step ${num}:  `}
      </Text>
      {str}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  stepStyle: {
    marginLeft: 25,
  },
  textScrollStyle: {
    marginBottom: 20,
  },
});
