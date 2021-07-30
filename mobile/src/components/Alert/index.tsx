import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import theme, { Text } from "../../config/Theme";
import Button from "../Button";
import Modal from "../Modal";

const { height, width } = Dimensions.get("window");

interface IAlert {
  show: boolean;
  onClose: () => void;
  text?: string;
  btnText?: string;
  btnEnabled?: boolean;
}

const Alert = (props: IAlert) => {
  const { show, onClose, text, btnText = "Ok", btnEnabled = true } = props;

  return (
    <Modal state={show} onClosed={onClose} contentStyle={styles.modalContent}>
      <View style={styles.alert}>
        <Text variant="heading2" style={styles.modalText}>
          {text}
        </Text>

        <View>
          <Button
            enabled={btnEnabled}
            variant="primary"
            label={btnText}
            containerStyle={{ width: width * 0.4 }}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {},

  alert: {
    height: height * 0.4,
    width: width * 0.8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  modalContent: {
    height,
    width,
    justifyContent: "center",
  },
  modalText: {
    textAlign: "center",
  },
});
