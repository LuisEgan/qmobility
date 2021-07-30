import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StyleProp,
  ImageSourcePropType,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import theme, { Text } from "../../../config/Theme";
import { IComponentsDefaults } from "../../../lib/Types";

interface ICardImage extends IComponentsDefaults {
  onPress?: () => void;
  imgUri?: string;
  imgSource?: ImageSourcePropType;
  svgIcon?: JSX.Element;
  name?: string;
  title?: string;
  subTitle?: string;
  textStyle?: StyleProp<TextStyle>;
}

const CardImage = (props: ICardImage) => {
  const {
    onPress,
    imgUri,
    imgSource,
    svgIcon,
    name,
    title,
    subTitle,
    containerStyle,
    textStyle,
  } = props;

  const Card = () => (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <View style={styles.contentImage}>
          {imgUri || imgSource ? (
            <Image
              style={styles.logo}
              source={
                imgSource || {
                  uri: imgUri,
                }
              }
            />
          ) : (
            svgIcon
          )}
        </View>
        <View style={styles.textContent}>
          <Text
            numberOfLines={1}
            style={[textStyle, { paddingBottom: 10 }]}
            variant="heading2"
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={textStyle} variant="body">
            {title}
          </Text>
          <Text numberOfLines={1} variant="bodyHighlight">
            {subTitle}
          </Text>
        </View>
      </View>
    </View>
  );

  return onPress ? (
    <TouchableOpacity {...{ onPress }}>
      <Card />
    </TouchableOpacity>
  ) : (
    <Card />
  );
};

export default CardImage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "1%",
    height: 100,
    borderRadius: 10,
    backgroundColor: theme.colors.cardsBackground,
  },
  content: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contentImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },

  textContent: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
  },
});
