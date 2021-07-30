import React from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
  ImageStyle,
} from "react-native";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import theme, { Text } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";

import placeholderImg from "../../assets/png/Nissan_Leaf_2018-02x2.png";

const { width, height } = Dimensions.get("window");

export enum ESlide {
  Default,
  Cards,
}

export interface ISlide extends IComponentsDefaults {
  contentStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  title?: string;
  titleStyle?: TextStyle;
  text?: string;
  type?: ESlide;
  imgSource?: ImageSourcePropType;
  imgUri?: string;
  imgContainerStyle?: StyleProp<ViewStyle>;
  imgStyle?: ImageStyle;
  svgIcon?: JSX.Element;
  width?: number;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  inCardComponent?: JSX.Element;
  outerCardComponent?: JSX.Element;
}

interface ISLideProps extends ISlide {
  index: number;
  currentIndex: Animated.Node<number>;
}
const Slide = (props: ISLideProps) => {
  const {
    containerStyle,
    contentStyle,
    type,
    titleStyle,
    title,
    text,
    imgSource,
    imgUri,
    imgContainerStyle,
    imgStyle,
    svgIcon,
    width: widthProp,
    index,
    currentIndex,
    titleColor = theme.colors.white,
    textColor = theme.colors.white,
    backgroundColor = theme.colors.primary,
    inCardComponent,
    outerCardComponent,
  } = props;

  const setStyle = () => {
    switch (type) {
      case ESlide.Default:
        return {
          container: styles.defaultContainer,
          content: styles.defaultContent,
          title: styles.defaultTitle,
          text: styles.defaultText,
        };

      case ESlide.Cards:
        return {
          container: styles.cardsContainer,
          content: styles.cardsContent,
          title: styles.cardsTitle,
          text: styles.cardsText,
        };

      default:
        return {};
    }
  };

  const setAnims = () => {
    const scale = interpolate(currentIndex, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.8, 1, 0.8],
      extrapolate: Extrapolate.CLAMP,
    });

    const translateX = interpolate(currentIndex, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [-95, 0, 95],
      extrapolate: Extrapolate.CLAMP,
    });

    switch (type) {
      case ESlide.Default:
        return {};

      case ESlide.Cards:
        return {
          transform: [
            {
              scale,
            },
            {
              translateX,
            },
          ],
        };

      default:
        return {};
    }
  };

  const typeStyle = setStyle();

  return (
    <View style={[typeStyle.container, { width: widthProp }, containerStyle]}>
      <Animated.View
        style={[
          typeStyle.content,
          setAnims(),
          {
            backgroundColor,
          },
          contentStyle,
        ]}
      >
        {imgSource || imgUri ? (
          <View style={[styles.imageContainer, imgContainerStyle]}>
            <Image
              source={
                imgUri ? { uri: imgUri || "" } : imgSource || placeholderImg
              }
              style={[styles.image, imgStyle]}
            />
          </View>
        ) : (
          svgIcon
        )}

        <Text
          variant="heading1"
          color={titleColor}
          style={[typeStyle.title, titleStyle]}
        >
          {title}
        </Text>
        <Text variant="body" color={textColor} style={typeStyle.text}>
          {text}
        </Text>

        {inCardComponent}
      </Animated.View>

      {outerCardComponent}
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: height * 0.5,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width, height: height * 0.4 },

  // * Default
  defaultContainer: {},
  defaultContent: {
    height: "100%",
  },
  defaultTitle: { height: 0 },
  defaultText: { height: 0 },

  // * Cards
  cardsContainer: {
    padding: 30,
  },
  cardsContent: {
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsTitle: {
    marginVertical: 25,
    marginHorizontal: 10,
  },
  cardsText: {
    textAlign: "center",
    paddingHorizontal: 15,
  },
});
