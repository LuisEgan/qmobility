import React, { PropsWithChildren } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal as ModalItem,
  Dimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import theme from "../../config/Theme";

import { IComponentsDefaults } from "../../lib/Types";

const { height, width } = Dimensions.get("window");

interface IModal extends IComponentsDefaults {
  state: boolean;
  onClosed: () => void;
  notTouch?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

const Modal = (props: PropsWithChildren<IModal>) => {
  const {
    state,
    onClosed,
    children,
    notTouch = false,
    containerStyle,
    contentStyle,
  } = props;

  return (
    <ModalItem
      transparent
      animationType="fade"
      visible={state}
      onRequestClose={() => !notTouch && onClosed}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.contentStyle, containerStyle]}
        onPress={() => !notTouch && onClosed}
      >
        <View style={{ flex: 1 }} />
        <View style={[styles.modalContent, contentStyle]}>{children}</View>
      </TouchableOpacity>
    </ModalItem>
  );
};

export default Modal;

const styles = StyleSheet.create({
  contentStyle: {
    width,
    height,
    backgroundColor: theme.colors.blackTransparent,
  },
  modalContent: {
    alignItems: "center",
  },
});
