import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Phone from "react-native-phone-number-input";
import { Text } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";
import { CountryApocope } from "./Types";

interface IonChangeFormattedText {
  phone?: string;
  phoneCountryCode?: string;
  phoneCountry?: CountryApocope;
}
interface IPhoneInput extends IComponentsDefaults {
  screen?: string;
  phone?: string;
  phoneCountry?: CountryApocope;
  phoneCountryCode?: string;
  label?: string;
  value?: string;
  onChangeText?: (str: string) => void;
  onChangeFormattedText?: (params: IonChangeFormattedText) => void;
  error?: string;
  onIsInvalid?: (phone: string | number) => void;
  disabled?: boolean;
}

const PhoneInput = (props: IPhoneInput) => {
  const {
    containerStyle,
    phone: phoneProp,
    phoneCountry: phoneCountryProp = "GB",
    phoneCountryCode: phoneCountryCodeProp = "44",
    label = "Phone number",
    value,
    onChangeText: onChangeTextProp,
    onChangeFormattedText,
    error,
    onIsInvalid,
    disabled,
  } = props;

  const phoneInput = useRef<Phone>(null);

  const [phone, setPhone] = useState<string>(phoneProp || "");
  const [phoneCountry, setPhoneCountry] = useState<CountryApocope>(
    phoneCountryProp || "",
  );
  const [phoneCountryCode, setPhoneCountryCode] = useState<string>(
    phoneCountryCodeProp || "",
  );

  useEffect(() => {
    if (!phoneInput) return;

    const updatePhoneData = async () => {
      try {
        // * There's a weird mix in naming with the Phone component in use
        // * Country Code should be a NUMBER = +56, +58, etc
        // * Calling Code is used as the country APOCOPE
        // * The Phone component has it backwards.
        const newPhoneCountryCode = phoneInput.current?.getCallingCode() || "";
        const newPhoneCountry = phoneInput.current?.getCountryCode() as CountryApocope;

        if (
          newPhoneCountry !== phoneCountry
          || newPhoneCountryCode !== phoneCountryCode
        ) {
          setPhoneCountry(newPhoneCountry);
          setPhoneCountryCode(newPhoneCountryCode);

          if (onChangeFormattedText) {
            onChangeFormattedText({
              phone,
              phoneCountryCode: newPhoneCountryCode,
              phoneCountry: newPhoneCountry,
            });
          }
        }
      } catch (e) {
        console.error("e: ", e);
      }
    };

    updatePhoneData();
  });

  // * Set initial phone value
  useEffect(() => {
    if (phoneProp) {
      setPhone(phoneProp);
    }

    if (phoneCountryProp) {
      setPhoneCountry(phoneCountryProp);
    }
  }, [phoneProp, phoneCountryProp]);

  // * Trigger onchange callbacks on initial renders
  useEffect(() => {
    if (onChangeTextProp) onChangeTextProp(phone);
    if (onChangeFormattedText) {
      onChangeFormattedText({
        phone,
        phoneCountryCode,
        phoneCountry,
      });
    }
  }, []);

  const onChangeText = (str: string) => {
    if (onChangeTextProp) {
      onChangeTextProp(str);
    }

    setPhone(str);
  };

  const onChangePhone = (p: string) => {
    if (onChangeFormattedText) onChangeFormattedText({ phone: p });

    const isValid = phoneInput.current?.isValidNumber(+p);
    if (!isValid && onIsInvalid) {
      onIsInvalid(p);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {disabled && <View style={styles.disabledContainer} />}
      <Text variant="bodySmall">{label}</Text>
      <Phone
        disableArrowIcon={disabled}
        defaultValue={value || phone}
        ref={phoneInput}
        onChangeText={onChangeText}
        onChangeFormattedText={onChangePhone}
        defaultCode={phoneCountry}
      />
      {!!error && <Text variant="error">{error}</Text>}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: { marginVertical: 10 },

  disabledContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});
