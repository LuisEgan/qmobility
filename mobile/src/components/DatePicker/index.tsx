import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Text } from "../../config/Theme";
import { dateToText } from "../../lib/dates";

interface IDatePicker {
  onChange?: (date: string | Date) => void;
  value?: string | Date;
  label?: string;
}

const DatePicker = (props: IDatePicker) => {
  const { onChange: onChangeProp, value, label } = props;

  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<string | Date>(value || "");
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    if (value) {
      setDate(value);
      setIsFirstTime(false);
    }
  }, [value]);

  const onChange = (event: Event, selectedDate?: Date) => {
    if (event) {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setIsFirstTime(false);

      setDate(currentDate);
      if (onChangeProp) onChangeProp(currentDate);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setShow(true)}>
        <Text variant="bodySmall">{label}</Text>

        {date && !isFirstTime ? (
          <Text style={styles.placeholder}>{dateToText(date)}</Text>
        ) : (
          <Text style={styles.placeholder} color="defautlInput">
            Date of birth
          </Text>
        )}
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(date)}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: "5%",
    borderBottomColor: theme.colors.defautlInput,
  },
  placeholder: {
    fontSize: 16,
    height: 40,
    padding: 10,
  },
});
