import React, { createContext, FC, useMemo, useState } from "react";
import { Region } from "react-native-maps";
import * as Location from "expo-location";

interface IUserLocationMethods {
  userLocation: Region | undefined;
  storeUserLocation: (location?: Region) => Promise<void | null>;
}

const initRegion: Region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.007,
  longitudeDelta: 0.007,
};
const init: IUserLocationMethods = {
  userLocation: initRegion,
  storeUserLocation: async () => null,
};
export const UserLocationContext = createContext<IUserLocationMethods>(init);

const UserLocationProvider: FC = (props) => {
  const { children } = props;

  const [location, setLocation] = useState<Region>();

  const value = useMemo(
    () => ({
      userLocation: location,
      storeUserLocation: async () => {
        try {
          const { status } = await Location.requestPermissionsAsync();
          if (status === "granted") {
            const userLocation = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            });

            const { latitude, longitude } = userLocation.coords;
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.007,
              longitudeDelta: 0.007,
            });
          }
        } catch (error) {
          console.error("error: ", error);
        }
      },
    }),
    [location],
  );

  return (
    <UserLocationContext.Provider value={value}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;
