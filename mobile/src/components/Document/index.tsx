import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import Modal from "../Modal";
import Icons from "../svg";
import theme from "../../config/Theme";

interface IDocument {
  state: boolean;
  onClosed: () => void;
  url?: string;
}

const { width, height } = Dimensions.get("window");

const Document = ({ state, onClosed, url }: IDocument) => {
  const ModalCocument = () => (
    <Modal state={state} onClosed={onClosed}>
      <View>
        <View style={styles.containertIcon}>
          <View style={styles.constentIcon}>
            <Icons
              icon="Cancel"
              onPress={onClosed}
              size={30}
              fill={theme.colors.grayDark}
            />
          </View>
        </View>
        {url && (
          <WebView
            // javaScriptEnabled={false}
            source={{ uri: url }}
            style={styles.pdf}
          />
        )}
      </View>
    </Modal>
  );
  return <View style={styles.container}>{state && <ModalCocument />}</View>;
};

export default Document;

const styles = StyleSheet.create({
  container: {},
  containertIcon: {
    paddingLeft: 13,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  constentIcon: {
    width: 30,
  },
  pdf: {
    width,
    height: height - Constants.statusBarHeight,
  },
});
