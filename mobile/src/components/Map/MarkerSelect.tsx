import React from "react";
import { StyleSheet, View } from "react-native";
import { Marker, Callout, LatLng } from "react-native-maps";

import { useNavigation } from "@react-navigation/native";
import Icons from "../svg";
import theme, { Text } from "../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../lib/constants";

import app from "../../../app.json";

const API_KEY = app.expo.android.config.googleMaps.apiKey;

interface IMarkerSelect {
  markeeSelect: LatLng;
  locationUser: LatLng;
  onModal: (state: boolean) => void;
}

const MarkerSelect = (props: IMarkerSelect) => {
  const { markeeSelect, locationUser, onModal } = props;

  const { navigate } = useNavigation();

  const onGoToMap = async () => {
    let location = "";
    let marker = "";

    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locationUser.latitude},${locationUser.longitude}&key=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        location = responseJson.results[0].formatted_address;
      });

    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${markeeSelect.latitude},${markeeSelect.longitude}&key=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        marker = responseJson.results[0].formatted_address;
      });
    setTimeout(() => {
      onModal(false);
      navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
        origin: location,
        destination: marker,
      });
    }, 500);
  };

  return (
    <>
      <Marker coordinate={markeeSelect}>
        <Icons icon="Room" fill={theme.colors.secondaryDark} />
        <Callout
          tooltip
          style={styles.containerCollout}
          onPress={() => {
            onGoToMap();
            onModal(true);
          }}
        >
          <View style={styles.contantTitleCollout}>
            <Text style={styles.titleCollout}>GO TO LOCATION</Text>
          </View>

          <View style={styles.contentIconCollout}>
            <Icons icon="DirectionsCar" fill={theme.colors.white} size={25} />
          </View>
        </Callout>
      </Marker>
    </>
  );
};

MarkerSelect.defaultProps = {};

export default MarkerSelect;

const styles = StyleSheet.create({
  containerCollout: {
    width: 170,
    height: 30,
    flexDirection: "row",
  },
  contantTitleCollout: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  titleCollout: {
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginHorizontal: 10,
    color: theme.colors.white,
  },
  contentIconCollout: {
    flex: 1,
    height: "100%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondaryDark,
  },
});
