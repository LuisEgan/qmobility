import React, { FC, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useTransition, mix } from "react-native-redash";
import RightMenu from "./RightMenu";
import theme from "../../../config/Theme";

const { width, height } = Dimensions.get("window");
const MENU_WIDTH = width * 0.6;
const ANIM_DURATION = 300;

interface IDrawerRightMenu {
  isDrawerOpen: boolean;
  onDrawerToggle?: (isOpen: boolean) => void;
}

const DrawerRightMenu: FC<IDrawerRightMenu> = (props) => {
  const { isDrawerOpen: isDrawerOpenProp, onDrawerToggle } = props;

  const swipeRef = useRef<Swipeable>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isDrawerOpenProp);
  const [displayContent, setDisplayContent] = useState<boolean>(
    isDrawerOpenProp,
  );

  const transition = useTransition(isDrawerOpen, {
    duration: 300,
  });
  const translateX = mix(transition, MENU_WIDTH, 0);

  useEffect(() => {
    toggleDrawer(isDrawerOpenProp);
  }, [isDrawerOpenProp]);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);

    if (open) {
      setDisplayContent(open);
    } else {
      setTimeout(() => {
        setDisplayContent(open);
      }, ANIM_DURATION * 2);
    }

    if (onDrawerToggle) onDrawerToggle(open);
  };

  if (!displayContent) return null;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[styles.closePress, { width: width - MENU_WIDTH }]}
        onPress={() => toggleDrawer(false)}
      />

      <RightMenu
        animContainerStyle={[
          styles.menu,
          {
            width: MENU_WIDTH,
            transform: [{ translateX }],
          },
        ]}
        onItemPress={() => {
          toggleDrawer(false);
          swipeRef?.current?.close();
        }}
      />
    </View>
  );
};

export default DrawerRightMenu;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    height,
  },

  closePress: {
    position: "absolute",
    height,
    left: 0,
  },

  menu: {
    position: "absolute",
    height,
    right: 0,
    backgroundColor: theme.colors.white,
  },
});
