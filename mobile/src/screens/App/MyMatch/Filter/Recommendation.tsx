import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import RangeSlider from "react-native-range-slider-expo";
import theme, { Text } from "../../../../config/Theme";

const { width } = Dimensions.get("window");

interface IRecommendation {
  onRangeMinChange?: (min: number) => void;
  onRangeMaxChange?: (min: number) => void;
  initMin?: number;
  initMax?: number;
}

const Recomendation = (props: IRecommendation) => {
  const {
    onRangeMinChange,
    onRangeMaxChange,
    initMin = 0,
    initMax = 500,
  } = props;

  const [fromValue, setFromValue] = useState(initMin);
  const [toValue, setToValue] = useState(initMax);

  const fromValueOnChange = (value: number) => {
    setFromValue(value);

    if (onRangeMinChange) {
      onRangeMinChange(value);
    }
  };

  const toValueOnChange = (value: number) => {
    setToValue(value);

    if (onRangeMaxChange) {
      onRangeMaxChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text color={theme.colors.white}>eVe Recommendation</Text>
        <Text color={theme.colors.white}>
          {initMin}
          {" "}
          -
          {initMax}
          {" "}
          mi
        </Text>
      </View>

      <Text style={{ padding: 10, color: "#707070", fontSize: 14 }}>
        User Range Filter
      </Text>

      <View style={styles.slider}>
        <Text style={styles.text}>0 mi</Text>

        <RangeSlider
          min={0}
          max={500}
          initialToValue={initMax}
          initialFromValue={initMin}
          inRangeBarColor={theme.colors.primary}
          rangeLabelsTextColor={theme.colors.primary}
          outOfRangeBarColor="#D2F6FD"
          fromValueOnChange={fromValueOnChange}
          toValueOnChange={toValueOnChange}
          styleSize="small"
          showRangeLabels={false}
        />

        <Text style={styles.text}>500 mi</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.primary,
          }}
        >
          {`${fromValue} - ${toValue} mi`}
        </Text>
      </View>
    </View>
  );
};

export default Recomendation;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#00000026",
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.secondaryDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
  },
  slider: {
    width: width * 0.6,
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    marginBottom: 25,
    fontSize: 12,
    color: theme.colors.gray,
  },
});
