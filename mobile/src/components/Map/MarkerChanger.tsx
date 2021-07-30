import React from "react";
import { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { IChargers } from "../../gql/Route/queries";
import Icons from "../svg";
import theme from "../../config/Theme";

interface IMarkerChanger {
  chargers?: IChargers[];
}

const MarkerChanger = (props: IMarkerChanger) => {
  const { chargers } = props;

  if (!chargers?.length) return <></>;

  return (
    <>
      {chargers.map((charger: IChargers, index: number) => {
        if (!index) {
          return (
            <Marker
              key={Math.random()}
              coordinate={{
                latitude: charger.latitude ? charger.latitude : 0,
                longitude: charger.longitude ? charger.longitude : 0,
              }}
            >
              <View style={styles.view}>
                <Icons icon="EvStation" fill={theme.colors.gray} size={20} />
              </View>
            </Marker>
          );
        }

        return (
          <Marker
            key={Math.random()}
            coordinate={{
              latitude: charger.latitude ? charger.latitude : 0,
              longitude: charger.longitude ? charger.longitude : 0,
            }}
          >
            <View style={styles.view}>
              <Icons icon="EvStation" fill={theme.colors.primary} size={20} />
            </View>
          </Marker>
        );
      })}
    </>
  );
};

MarkerChanger.defaultProps = {};

export default MarkerChanger;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
});
