import React, { FC, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import Swipeable from "react-native-gesture-handler/Swipeable";

import theme from "../../../config/Theme";
import LeftMenu from "./LeftMenu";

const { width, height } = Dimensions.get("screen");
const ANIM_DURATION = 300;

interface IDrawerLeftMenu {
  isDrawerOpen: boolean;
  onDrawerToggle?: (isOpen: boolean) => void;
  swippable?: boolean;
}

const DrawerLeftMenu: FC<IDrawerLeftMenu> = (props) => {
  const { children, isDrawerOpen: isDrawerOpenProp, onDrawerToggle } = props;

  const swipeRef = useRef<Swipeable>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isDrawerOpenProp);

  useEffect(() => {
    toggleDrawer(isDrawerOpenProp);

    if (isDrawerOpenProp) {
      swipeRef?.current?.openLeft();
    }
  }, [isDrawerOpenProp]);

  const transition = useTransition(isDrawerOpen, {
    duration: ANIM_DURATION,
  });

  // * Content container animations
  const contentX = mix(transition, 0, width * 0.5);
  const contentOpacity = mix(transition, 1, 0.5);
  const contentScale = mix(transition, 1, 0.85);

  // * Menu container animations
  const menuX = mix(transition, width * -1, 0);
  const menuOpacity = mix(transition, 0, 1);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
    if (onDrawerToggle) onDrawerToggle(open);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: contentOpacity,
            borderRadius: isDrawerOpen ? 10 : 0,
            transform: [
              {
                translateX: contentX,
              },
              {
                scale: contentScale,
              },
            ],
          },
        ]}
      >
        {isDrawerOpen && (
          <TouchableOpacity
            style={styles.drawerCloser}
            onPress={() => toggleDrawer(false)}
          />
        )}
        {children}
      </Animated.View>
      <Animated.View
        style={[
          styles.menuContent,
          {
            opacity: menuOpacity,
            transform: [
              {
                translateX: menuX,
              },
            ],
          },
        ]}
      >
        {isDrawerOpen && (
          <LeftMenu
            onItemPress={() => {
              toggleDrawer(false);
            }}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default DrawerLeftMenu;

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: theme.colors.drawerBackground,
  },

  drawerCloser: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 0,
  },

  menuContent: {
    width: width * 0.5,
    height,
    position: "absolute",
    left: 0,
  },

  content: {
    height,
    overflow: "hidden",
  },
});
