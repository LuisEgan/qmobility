import React from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import theme, { Text } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";

export type TVariant = "default" | "primary" | "secondary";

interface IButton extends IComponentsDefaults {
  label: string;
  onPress: () => void;
  variant?: TVariant;
  iconRight?: TIcon;
  iconLeft?: TIcon;
  inverse?: boolean;
  enabled?: boolean;
}

const Button = (props: IButton) => {
  const {
    onPress,
    label,
    variant,
    iconRight,
    iconLeft,
    containerStyle,
    inverse,
    enabled = true,
  } = props;

  const setRectButtonStyle = (): ViewStyle => {
    let backgroundColor = "";
    switch (variant) {
      case "primary":
        backgroundColor = theme.colors.primaryButton;
        break;
      case "secondary":
        backgroundColor = theme.colors.secondaryButton;
        break;
      default:
        backgroundColor = theme.colors.defaultButton;
    }

    return inverse
      ? {
        borderWidth: 1,
        borderColor: backgroundColor,
        backgroundColor: theme.colors.inverseButtonBackground,
      }
      : { backgroundColor };
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[setRectButtonStyle(), styles.button, containerStyle]}
      onPress={onPress}
      disabled={!enabled}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "center" }}
        accessible
      >
        {iconLeft && (
          <Icons size={22} icon={iconLeft} fill={theme.colors.white} />
        )}
        <Text
          variant="button"
          color={inverse ? `${variant}Button` : theme.colors.white}
        >
          {label}
        </Text>
        {iconRight && (
          <Icons size={22} icon={iconRight} fill={theme.colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: { height: 50 },

  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    borderRadius: 25,
  },
});
