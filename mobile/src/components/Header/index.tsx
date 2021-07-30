import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Text } from "../../config/Theme";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface IHeader extends IComponentsDefaults {
  onPress?: () => void;
  onPressRight?: () => void;
  title?: string;
  subTitle?: string;
  icon?: TIcon;
  iconRight?: TIcon;
  text?: string;
  textRight?: string;
  height?: number;
}

const { width, height } = Dimensions.get("window");

const Header = (props: IHeader) => {
  const {
    title,
    subTitle,

    onPress,
    icon,
    text,

    onPressRight,
    iconRight,
    textRight,

    containerStyle,
  } = props;

  // TODO redo everything
  return (
    <View style={[styles.container, containerStyle]}>
      {(icon || text)
        && (onPress ? (
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.touchableOpacity}
            >
              {icon && <Icons size={30} icon={icon} />}
              {text && (
                <Text variant="body" style={[styles.text, styles.leftText]}>
                  {text}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.icon}>
            {text && (
              <Text variant="body" style={[styles.text, styles.leftText]}>
                {text}
              </Text>
            )}
            {icon && <Icons size={30} icon={icon} />}
          </View>
        ))}
      <View style={styles.content}>
        <View style={styles.view}>
          {title && <Text variant="heading1">{title}</Text>}
          {subTitle && <Text variant="subheadingLight">{subTitle}</Text>}
        </View>
      </View>

      {(iconRight || textRight)
        && (onPressRight ? (
          <View style={styles.iconRight}>
            <TouchableOpacity
              onPress={() => onPressRight()}
              style={styles.touchableOpacity}
            >
              {iconRight && <Icons size={30} icon={iconRight} />}
              {textRight && (
                <Text variant="body" style={styles.text}>
                  {textRight}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconRight}>
            {iconRight && <Icons size={30} icon={iconRight} />}
            {textRight && (
              <Text variant="body" style={styles.text}>
                {textRight}
              </Text>
            )}
          </View>
        ))}
    </View>
  );
};

export default Header;

const heightMultiplier = Platform.OS === "ios" ? 0.21 : 0.24;
const heightTopIcons = Platform.OS === "ios" ? 0.06 : 0.05;

const styles = StyleSheet.create({
  container: {
    height: height * heightMultiplier,
    borderBottomWidth: 0.5,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.grayLight,
  },
  touchableOpacity: {
    width: 70,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 30,
  },
  icon: {
    flexDirection: "row",
    position: "absolute",
    elevation: 1,
    zIndex: 1,
    top: height * heightTopIcons,
    left: width * -0.02,
  },
  iconRight: {
    flexDirection: "row",
    position: "absolute",
    elevation: 99,
    zIndex: 99,
    top: height * 0.05,
    right: width * 0.02,
  },
  content: {
    width,
    height: height * 0.21,
    justifyContent: "center",
  },
  view: {
    marginTop: width * 0.2,
    marginHorizontal: width * 0.05,
  },

  text: {
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  leftText: {
    position: "absolute",
    top: height * 0.035,
    left: width * 0.05,
  },
});
