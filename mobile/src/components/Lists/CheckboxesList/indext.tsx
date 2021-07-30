import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import theme, { Text } from "../../../config/Theme";

export type TCheckboxesOptions = Array<string | number>;

interface ICheckboxesList {
  options: TCheckboxesOptions;
  label?: string;
  onChange?: (selectedValues: TCheckboxesOptions) => void;
  values?: TCheckboxesOptions;
}

const CheckboxesList = (props: ICheckboxesList) => {
  const { options, label, onChange, values } = props;

  const [selectedValues, setSelectedValues] = useState<TCheckboxesOptions>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (values && initialized) {
      setSelectedValues(values);
    }
  }, [values]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedValues);
    }
  }, [selectedValues]);

  const onValueChange = (isSelected: boolean, option: string | number) => {
    let newSelectedValues = [...selectedValues];

    if (isSelected) {
      newSelectedValues = [...selectedValues, option];
    } else {
      newSelectedValues.splice(selectedValues.indexOf(option), 1);
    }

    setSelectedValues([...newSelectedValues]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      {options.map((o) => (
        <View key={o} style={styles.contentCheckBox}>
          <CheckBox
            checked={selectedValues.includes(o)}
            onPress={() => onValueChange(!selectedValues.includes(o), o)}
            uncheckedColor={theme.colors.grayLight}
            size={30}
          />
          <Text style={styles.text}>{o}</Text>
        </View>
      ))}
    </View>
  );
};

export default CheckboxesList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    color: "#707070",
  },
  contentCheckBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#1D2226",
  },
});
