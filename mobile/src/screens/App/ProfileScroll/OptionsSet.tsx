import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ECategory, IOptionsSet } from "./options";
import theme, { Text } from "../../../config/Theme";

const OptionsSet = ({
  question,
  options,
  answers,
  setAnswers,
}: IOptionsSet) => {
  const onOptionPress = (category: ECategory) => {
    setAnswers({
      ...answers,
      [question]: category,
    });
  };

  return (
    <View style={styles.optionsContainer}>
      {options.map(({ answer, category }) => (
        <TouchableOpacity
          key={answer}
          onPress={() => onOptionPress(category)}
          style={[
            styles.option,
            {
              backgroundColor:
                answers[question] === category
                  ? theme.colors.primary
                  : theme.colors.secondaryDark,
            },
          ]}
        >
          <Text color="white" style={{ textAlign: "center" }}>
            {answer}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionsSet;

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 0.7,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  option: {
    borderRadius: 10,
    padding: 10,
  },
});
