import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "../../../../components";
import theme, { Text } from "../../../../config/Theme";

const Price = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Price</Text>
    <View style={styles.contentInput}>
      <Input
        isNumber
        placeholder="Min"
        containerStyle={styles.inputMin}
        inputStyle={styles.input}
      />
      <Input
        isNumber
        placeholder="Max"
        containerStyle={styles.inputMax}
        inputStyle={styles.input}
      />
    </View>
  </View>
);

export default Price;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  contentInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    height: 50,
    borderColor: theme.colors.gray,
  },
  inputMax: {
    flex: 1,
    marginVertical: 0,
  },
  inputMin: {
    flex: 1,
    marginRight: 15,
    marginVertical: 0,
  },
});
