import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash";
import Slide, { ISlide, ESlide } from "./Slide";
import PaginationDot from "./PaginationDot";
import { getFirstDecimalNumber } from "../../lib/strings";
import { IComponentsDefaults } from "../../lib/Types";

interface ISlider extends IComponentsDefaults {
  slides: ISlide[];
  width: number;
  height: number;
  type?: ESlide;
  onLastSlide?: () => void;
  notOnLastSlide?: () => void;
}

const Slider = (props: ISlider) => {
  const {
    type = ESlide.Default,
    containerStyle,
    slides,
    width,
    height,
    onLastSlide,
    notOnLastSlide,
  } = props;

  const { scrollHandler, x } = useScrollHandler();

  const currentIndex = divide(x, width);

  const getIsOnLastSlide = (xOffset: number): void => {
    const movedSlideIndex = xOffset / width;
    const isSwippingRight = getFirstDecimalNumber(movedSlideIndex) < 5;

    // * Must take 1 or 2 from slides.length because
    // * first -1: Always, slides are counted from 0.
    // * second -1: Depends if the user swipes right or left.

    // * Swipping left: movedSlideIndex is the one that the user passed and no longer sees
    // * We don't substract the second 1.

    // * Swipping right: movedSlideIndex is the one that the user is currently on:
    // * the function recieves the passed slide index, so, for example:
    // * if there are 4 slides, the last slide's index is 3, so getting to the last slide
    // * the function will recieve the passed one, which would be the one before the last one
    // * with index 2. So, this means, that if you passed the slide 2, you end up in the slide 3
    const indexOffset = 1 + 1 * +isSwippingRight;

    const isLastSlide = Math.trunc(movedSlideIndex) >= slides.length - indexOffset;

    if (isLastSlide) {
      if (onLastSlide) {
        onLastSlide();
      }
    } else if (notOnLastSlide) {
      notOnLastSlide();
    }
  };

  const setStyle = () => {
    switch (type) {
      case ESlide.Default:
        return {
          pagination: styles.defaultPagination,
        };

      case ESlide.Cards:
        return {
          pagination: styles.cardsPagination,
        };

      default:
        return {};
    }
  };

  const typeStyle = setStyle();

  return (
    <View style={[styles.container, containerStyle, { width, height }]}>
      <Animated.ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={(e) => getIsOnLastSlide(e.nativeEvent.contentOffset.x)}
        {...scrollHandler}
      >
        {slides.map((slide, index) => (
          <Slide
            key={Math.random()}
            {...{
              ...slide,
              index,
              type,
              width,
              currentIndex,
            }}
          />
        ))}
      </Animated.ScrollView>

      <View style={typeStyle.pagination}>
        {slides.map((_, index) => (
          <PaginationDot key={Math.random()} {...{ index, currentIndex }} />
        ))}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {},

  // * Default
  defaultPagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  // * Cards
  cardsPagination: {
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
