import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Modal } from "../../../components";
import theme from "../../../config/Theme";

const { height } = Dimensions.get("window");

interface IModalSaveRoute {
  stateModal: boolean;
  onClosed?: () => void;
}

const ModalChangeLoading = (props: IModalSaveRoute) => {
  const { stateModal, onClosed } = props;

  const onCancel = () => {
    if (onClosed) onClosed();
  };

  return (
    <Modal state={stateModal} onClosed={() => onCancel()}>
      <View style={styles.containerModal}>
        <TouchableOpacity activeOpacity={1} style={styles.contentModal}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalChangeLoading;

const styles = StyleSheet.create({
  containerModal: {
    marginVertical: height * (Platform.OS === "ios" ? 0.5 : 0.4),
  },
  contentModal: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignContent: "center",
  },
  titleModal: {
    alignSelf: "center",
    marginVertical: "5%",
  },
  bodyModal: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  contentButtonModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
  },
  inputContent: {
    borderRadius: 10,
    paddingLeft: 5,
    height: 50,
    backgroundColor: theme.colors.white,
  },
  input: {
    borderBottomWidth: 0,
    marginTop: -8,
  },
  selectContent: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  containerPhaseTwo: {
    flexDirection: "row",
    flex: 1,
    paddingRight: "10%",
  },
  contentPheseTwo: {
    flex: 1,
  },
  textColor: {
    color: theme.colors.white,
  },
});
