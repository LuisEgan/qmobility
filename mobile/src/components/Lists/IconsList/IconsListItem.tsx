import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icons from "../../svg";
import { IComponentsDefaults } from "../../../lib/Types";
import theme, { Text } from "../../../config/Theme";
import { TIcon } from "../../svg/icons/TypeIcons";

export interface IIconsListItem extends IComponentsDefaults {
  text: string;
  onPress?: () => void;
  icon?: TIcon | JSX.Element;
  textVariant?: string;
  textColor?: string;
  svgFill?: string;
}

const IconsListItem = (props: IIconsListItem) => {
  const {
    text,
    onPress,
    icon,
    textVariant,
    textColor,
    containerStyle,
    svgFill,
  } = props;

  return (
    <TouchableOpacity
      {...{ onPress }}
      style={[styles.container, containerStyle]}
    >
      {typeof icon === "string" ? (
        <Icons icon={icon} width={25} fill={svgFill || theme.colors.primary} />
      ) : (
        icon
      )}
      <Text variant={textVariant} style={styles.text} color={textColor}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

IconsListItem.defaultProps = {
  textVariant: "body",
  textColor: "body",
};

export default IconsListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  text: {
    marginLeft: 10,
  },
});
