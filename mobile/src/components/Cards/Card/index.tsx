import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import Icons from "../../svg";
import theme, { Text } from "../../../config/Theme";
import { TIcon } from "../../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../../lib/Types";

interface ICard extends IComponentsDefaults {
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
  icon?: TIcon;
  textColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  subTitleStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const { width } = Dimensions.get("window");

const Card = (props: ICard) => {
  const {
    title,
    subTitle,
    icon,
    containerStyle,
    contentStyle,
    titleStyle,
    subTitleStyle,
    textColor = "",
    onPress,
  } = props;

  const Content = () => (
    <>
      <View style={styles.favoriteContainer}>
        {icon && (
          <View style={styles.favoriteContent}>
            <Icons icon={icon} fill={theme.colors.primary} size={25} />
          </View>
        )}

        {typeof title === "string" ? (
          <Text
            variant="heading2"
            style={[styles.text, titleStyle]}
            color={textColor || theme.colors.white}
          >
            {title}
          </Text>
        ) : (
          title
        )}
      </View>

      {subTitle
        && (typeof subTitle === "string" ? (
          <Text
            variant="label"
            style={[styles.text, subTitleStyle]}
            color={textColor || theme.colors.white}
          >
            {subTitle}
          </Text>
        ) : (
          subTitle
        ))}
    </>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {onPress ? (
        <TouchableOpacity
          style={[styles.content, contentStyle]}
          onPress={onPress}
        >
          <Content />
        </TouchableOpacity>
      ) : (
        <View style={[styles.content, contentStyle]}>
          <Content />
        </View>
      )}
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width * 0.43,
  },
  content: {
    height: 80,
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.secondaryDark,
  },
  favoriteContainer: {
    flexDirection: "row",
  },
  favoriteContent: {
    marginHorizontal: 5,
  },
  text: {},
});
