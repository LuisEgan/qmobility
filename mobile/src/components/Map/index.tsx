import React, { useState, useRef, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import RNM, {
  PROVIDER_GOOGLE,
  LatLng,
  MapEvent,
  Region,
  Marker,
} from "react-native-maps";
import MapView from "react-native-map-clustering";

import { useLazyQuery } from "@apollo/client";
import { IChargers } from "../../gql/Route/queries";
import theme from "../../config/Theme";

import MarkerChanger from "./MarkerChanger";
import MarkerSelect from "./MarkerSelect";
import Route from "./Route";
import Modal from "../Modal";
import { UserLocationContext } from "../../navigation/Navigators/UserLocationProvider";
import { ICharger } from "../../gql/Charger/queries";
import Charger from "../../gql/Charger";
import eveStation from "../../assets/png/eveStation.png";

const { height } = Dimensions.get("window");

const getAltitude = (origin: LatLng, destination: LatLng) => {
  const k = Math.PI / 180;
  const difLatitud = k * (origin.latitude - destination.latitude);
  const difLongitud = k * (origin.longitude - destination.longitude);

  const a = Math.sin(difLatitud / 2) ** 2
    + Math.cos(k * destination.latitude)
      * Math.cos(k * origin.latitude)
      * Math.sin(difLongitud / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const altitud = 6378 * (k * c);
  return altitud;
};

interface IMap {
  routeCoords?: LatLng[];
  chargers?: IChargers[];
  initialMain?: boolean;
  state?: boolean;
  initialLocation?: Region;
}

const Map = (props: IMap) => {
  const { routeCoords, chargers, initialMain, state, initialLocation } = props;

  const { userLocation, storeUserLocation } = useContext(UserLocationContext);

  const mapAnimation = useRef<RNM>(null);

  const [
    getAllChargers,
    { data: getAllChargersData, loading: getAllChargersLoading },
  ] = useLazyQuery<{
    getAllChargers: ICharger[];
  }>(Charger.queries.getAllChargers);

  const [stateModal, setStateModal] = useState<boolean>(false);
  const [markeeSelect, setMarkeeSelect] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [allChargers, setAllChargers] = useState<IChargers[]>();

  // * Set initialValues if not set yet
  useEffect(() => {
    const setInitialLocation = async () => {
      setStateModal(true);
      try {
        await storeUserLocation();

        // * if main page, get all chargers for the clusterfuck
        if (initialMain) {
          // getAllChargers();
          setStateModal(false);
        } else {
          setStateModal(false);
        }
      } catch (error) {
        console.error("error: ", error);
        setStateModal(false);
      }
    };

    if (!userLocation) {
      setInitialLocation();
    } else if (initialMain) {
      // * chargers are still needed to be fetched if there's already a user location
      // * but first, let the map's initial position load
      // setStateModal(true);
      setTimeout(() => {
        // getAllChargers();
      }, 1500);
    }
  }, []);

  // * Parse chargers
  useEffect(() => {
    if (getAllChargersData?.getAllChargers.length) {
      const newAllChargers = getAllChargersData?.getAllChargers.map(
        (charger) => ({
          latitude: +charger.ChargeDeviceLocation.Latitude,
          longitude: +charger.ChargeDeviceLocation.Longitude,
        }),
      );
      setAllChargers(newAllChargers);
      setStateModal(false);
    }
  }, [getAllChargersData]);

  // * Animate map when route changes
  useEffect(() => {
    if (routeCoords) routeAnimation(routeCoords);
  }, [routeCoords, state]);

  const routeAnimation = (coords: LatLng[] | undefined): void => {
    if (coords) {
      const start = coords[coords.length - 1];
      const end = coords[0];

      const altitude = getAltitude(start, end);

      const mediumLat = (start.latitude + end.latitude) / 2;
      const mediumLng = (end.longitude + start.longitude) / 2;

      setTimeout(() => {
        mapAnimation.current?.animateToRegion(
          {
            latitude: mediumLat,
            longitude: mediumLng,
            latitudeDelta: altitude,
            longitudeDelta: altitude,
          },
          500,
        );
      }, 1000);
    }
  };

  const newMarker = (event: MapEvent<Record<string, unknown>>) => {
    let marker;

    if (markeeSelect.latitude === 0) {
      const end = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      };

      marker = {
        latitude: end.latitude,
        longitude: end.longitude,
      };
    } else {
      marker = {
        latitude: 0,
        longitude: 0,
      };
    }
    setMarkeeSelect(marker);
  };

  return (
    <>
      {(stateModal || getAllChargersLoading) && (
        <Modal
          state={stateModal || getAllChargersLoading}
          onClosed={() => setStateModal(false)}
        >
          <View style={styles.containerModal}>
            <TouchableOpacity activeOpacity={1} style={styles.contentModal}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {userLocation && (
        <MapView
          ref={mapAnimation}
          showsUserLocation
          showsMyLocationButton={initialMain}
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          showsIndoorLevelPicker
          loadingIndicatorColor={theme.colors.primary}
          loadingBackgroundColor={theme.colors.white}
          style={styles.map}
          mapType="standard"
          onLongPress={(ev) => {
            if (initialMain) newMarker(ev);
          }}
          initialRegion={initialLocation || userLocation}
          minPoints={40}
          radius={20}
          minZoom={5}
        >
          {routeCoords && <Route routeCoords={routeCoords} />}

          {markeeSelect.latitude !== 0 && (
            <MarkerSelect
              markeeSelect={markeeSelect}
              locationUser={userLocation}
              onModal={(value) => setStateModal(value)}
            />
          )}

          <MarkerChanger chargers={chargers} />

          {allChargers?.map(({ latitude, longitude }) => (
            <Marker
              key={Math.random()}
              coordinate={{
                latitude: latitude || 0,
                longitude: longitude || 0,
              }}
              tracksViewChanges={false}
              icon={eveStation}
              opacity={0.7}
            />
          ))}
        </MapView>
      )}
    </>
  );
};

Map.defaultProps = {};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

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

  chargerMarker: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
});

export default Map;
