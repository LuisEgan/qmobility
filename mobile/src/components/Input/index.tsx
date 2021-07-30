import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Text } from "../../config/Theme";
import { onlyNumbersFormatter } from "../../lib/strings";
import { IComponentsDefaults } from "../../lib/Types";

interface IInput extends IComponentsDefaults {
  onChange?: (str: string) => void;
  value?: string | number;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onForgotPass?: () => void;
  label?: string;
  text?: string | null;
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
  isSignUp?: boolean;
  isNumber?: boolean;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  formatter?: (str: string) => string;
}

const Input = (props: IInput) => {
  const {
    onChange: onChangeProp,
    onBlur,
    onForgotPass,
    formatter,
    isNumber,
    label,
    placeholder,
    value,
    defaultValue,
    isPassword,
    isSignUp,
    error,
    touched,
    disabled = false,
    containerStyle,
    inputStyle,
    text,
  } = props;

  const onChange = (str: string) => {
    if (onChangeProp) onChangeProp(str);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text variant="bodySmall">{label}</Text>

      <TextInput
        style={[styles.inputStyle, inputStyle]}
        editable={!disabled}
        keyboardType={isNumber ? "phone-pad" : "default"}
        value={value}
        onChangeText={(str: string) => {
          let newStr = formatter ? formatter(str) : str;

          if (isNumber) {
            newStr = onlyNumbersFormatter(newStr);
          }

          onChange(newStr);
        }}
        placeholderTextColor={theme.colors.defautlInput}
        secureTextEntry={isPassword}
        {...{ defaultValue, placeholder, onBlur }}
      />
      {text && (
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 18,
          }}
        >
          <Text
            style={{
              color: theme.colors.gray,
            }}
          >
            {text}
          </Text>
        </View>
      )}

      {isPassword && !isSignUp && (
        <View style={styles.forgotPass}>
          <TouchableOpacity onPress={onForgotPass}>
            <Text variant="bodyHighlight">Forgot?</Text>
          </TouchableOpacity>
        </View>
      )}

      {error && touched && (
        <View style={[styles.error]}>
          <Text variant="error">{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    marginBottom: 10,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 40,
    padding: 10,
    borderBottomColor: theme.colors.defautlInput,
  },
  error: {
    marginTop: 5,
  },
  forgotPass: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    height: "80%",
    paddingHorizontal: 5,
  },
});
