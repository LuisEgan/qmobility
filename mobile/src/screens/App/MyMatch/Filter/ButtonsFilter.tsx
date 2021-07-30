import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../../../config/Theme";

interface IButtonsFilter {
  onPressCancel?: () => void;
  onPressDone?: () => void;
}

const ButtonsFilter = (props: IButtonsFilter) => {
  const { onPressCancel, onPressDone } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressCancel && onPressCancel()}>
        <Text style={styles.text} color="primary">
          Cancel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPressDone && onPressDone()}>
        <Text style={styles.text} color="secondaryDark">
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonsFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
});
