import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import { IComponentsDefaults } from "../../lib/Types";
import theme from "../../config/Theme";

const { width, height } = Dimensions.get("window");

interface IBottomDrawer extends IComponentsDefaults {
  maxHeight?: number;
  closeOffset?: number;
  isOpen?: boolean;
  scrollable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (newStatus: boolean) => void;
  disableToggler?: boolean;
}

const BottomDrawer: FC<IBottomDrawer> = (props) => {
  const {
    children,
    maxHeight = height * 0.6,
    closeOffset = height * 0.05,
    isOpen: isOpenProp = false,
    scrollable = true,
    disableToggler = false,
    containerStyle,
    onOpen,
    onClose,
    onToggle,
  } = props;

  const [isOpen, setIsDrawerOpen] = useState<boolean>(isOpenProp);

  const transition = useTransition(isOpen, { duration: 100 });
  const translateY = mix(transition, maxHeight - closeOffset, 0);

  useEffect(() => {
    setIsDrawerOpen(isOpenProp);
  }, [isOpenProp]);

  useEffect(() => {
    // * Open drawer
    if (isOpen && onOpen) {
      onOpen();
    }

    // * Close drawer
    if (!isOpen && onClose) {
      onClose();
    }

    // * Toggle cb
    if (onToggle) {
      onToggle(!isOpen);
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isOpen);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { height: maxHeight, transform: [{ translateY }] },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        onPress={toggleDrawer}
        style={styles.handle}
        disabled={disableToggler}
      >
        <View style={styles.handleIcon} />
      </TouchableOpacity>

      <View style={styles.content}>
        {scrollable ? <ScrollView>{children}</ScrollView> : children}
      </View>
    </Animated.View>
  );
};

export default React.memo<FC<IBottomDrawer>>(BottomDrawer);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    elevation: 1,
    backgroundColor: theme.colors.white,
    bottom: 0,
  },

  handle: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  handleIcon: {
    width: width * 0.1,
    height: 0,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 15,
    borderColor: theme.colors.drawerHandle,
  },

  content: {
    paddingTop: "5%",
    marginHorizontal: 20,
  },
});
